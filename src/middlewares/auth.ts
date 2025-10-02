import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

interface AuthenticatedRequest extends Request {
  user?: { username: string }
}

export class AuthMiddleware {
  static authenticate(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      res.status(401).json({
        error: 'Token de autorização não fornecido',
        message: 'Use Bearer token no header Authorization'
      })
      return
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      res.status(401).json({
        error: 'Token não fornecido'
      })
      return
    }

    try {
      const jwtSecret = process.env.JWT_SECRET
      if (!jwtSecret) {
        res.status(500).json({
          error: 'Configuração JWT não encontrada'
        })
        return
      }

      const decoded = jwt.verify(token, jwtSecret) as { username: string }
      req.user = { username: decoded.username }
      next()
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          error: 'Token expirado'
        })
        return
      }

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          error: 'Token inválido'
        })
        return
      }

      res.status(500).json({
        error: 'Erro ao verificar token'
      })
      return
    }
  }
}

export type { AuthenticatedRequest }
