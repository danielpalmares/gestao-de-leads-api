import { LeadRepository } from '@repositories/implementations/lead_repository.ts'
import {
  CreateLeadCase,
  CreateLeadController,
  ReadLeadCase,
  ReadLeadController,
  UpdateLeadCase,
  UpdateLeadController,
  DeleteLeadCase,
  DeleteLeadController
} from '../cases/Lead/index.ts'

const leadRepository = new LeadRepository()

const createLeadCase = new CreateLeadCase(leadRepository)
const readLeadCase = new ReadLeadCase(leadRepository)
const updateLeadCase = new UpdateLeadCase(leadRepository)
const deleteLeadCase = new DeleteLeadCase(leadRepository)

const createLeadController = new CreateLeadController(createLeadCase)
const readLeadController = new ReadLeadController(readLeadCase)
const updateLeadController = new UpdateLeadController(updateLeadCase)
const deleteLeadController = new DeleteLeadController(deleteLeadCase)

export {
  createLeadController,
  readLeadController,
  updateLeadController,
  deleteLeadController
}
