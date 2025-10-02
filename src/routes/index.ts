import express from 'express'
import {
  createLeadController,
  readLeadController,
  updateLeadController,
  deleteLeadController
} from '../setup/dependencies.ts'

const router = express.Router()

router.post('/leads', (req, res) => createLeadController.handle(req, res))
router.get('/leads', (req, res) => readLeadController.handleAll(req, res))
router.get('/leads/:id', (req, res) => readLeadController.handleById(req, res))
router.put('/leads/:id', (req, res) => updateLeadController.handle(req, res))
router.delete('/leads/:id', (req, res) => deleteLeadController.handle(req, res))

export { router }
