import jwt from 'jsonwebtoken'
import type { Request, Response } from 'express'

interface LoginRequest {
  username: string
  password: string
}

export class AuthController {
  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { username, password }: LoginRequest = request.body

      if (!username || !password) {
        return response.status(400).json({
          error: 'Username e password são obrigatórios'
        })
      }

      const validUsername = process.env.AUTH_USERNAME
      const validPassword = process.env.AUTH_PASSWORD
      const jwtSecret = process.env.JWT_SECRET

      if (!validUsername || !validPassword || !jwtSecret) {
        return response.status(500).json({
          error: 'Configuração de autenticação não encontrada'
        })
      }

      if (username !== validUsername || password !== validPassword) {
        return response.status(401).json({
          error: 'Credenciais inválidas'
        })
      }

      const token = jwt.sign({ username }, jwtSecret, { expiresIn: '24h' })

      return response.status(200).json({
        message: 'Login realizado com sucesso',
        token,
        expiresIn: '24h'
      })
    } catch (error) {
      return response.status(500).json({
        error: 'Erro interno do servidor'
      })
    }
  }
}
