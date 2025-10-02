import express from 'express'
import {
  createLeadController,
  readLeadController,
  updateLeadController,
  deleteLeadController
} from '../setup/dependencies.ts'
import { AuthController } from '../controllers/auth_controller.ts'
import { AuthMiddleware } from '../middlewares/auth.ts'

const router = express.Router()
const authController = new AuthController()

// Rotas públicas
router.post('/auth/login', (req, res) => authController.login(req, res))
router.post('/leads', (req, res) => createLeadController.handle(req, res))

// Rotas protegidas
router.get('/leads', AuthMiddleware.authenticate, (req, res) =>
  readLeadController.handleAll(req, res)
)
router.get('/leads/:id', AuthMiddleware.authenticate, (req, res) =>
  readLeadController.handleById(req, res)
)
router.put('/leads/:id', AuthMiddleware.authenticate, (req, res) =>
  updateLeadController.handle(req, res)
)
router.delete('/leads/:id', AuthMiddleware.authenticate, (req, res) =>
  deleteLeadController.handle(req, res)
)

export { router }
