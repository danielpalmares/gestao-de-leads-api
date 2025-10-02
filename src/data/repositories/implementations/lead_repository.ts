import type {
  ILeadRepository,
  LeadFilters
} from '@repositories/interfaces/lead_repository.ts'
import type { Lead } from '@entities/Lead.ts'
import { Lead as LeadEntity } from '@entities/Lead.ts'
import { prisma } from '@database/prisma.ts'
import type { Prisma } from '@prisma/client'
import type { Collection } from '@repositories/interfaces/pagination.ts'

export class LeadRepository implements ILeadRepository {
  async create(lead: Lead): Promise<Lead> {
    if (!lead.id) return Promise.reject()

    const createdLead = await prisma.lead.create({
      data: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone_number: lead.phone_number,
        role: lead.role,
        birth_date: lead.birth_date,
        message: lead.message
      }
    })

    return new LeadEntity(
      {
        name: createdLead.name,
        email: createdLead.email,
        phone_number: createdLead.phone_number,
        role: createdLead.role,
        birth_date: createdLead.birth_date,
        message: createdLead.message
      },
      createdLead.id
    )
  }

  async findById(id: string): Promise<Lead | null> {
    const lead = await prisma.lead.findUnique({
      where: { id }
    })

    if (!lead) {
      return null
    }

    return new LeadEntity(
      {
        name: lead.name,
        email: lead.email,
        phone_number: lead.phone_number,
        role: lead.role,
        birth_date: lead.birth_date,
        message: lead.message
      },
      lead.id
    )
  }

  async findAll(filters?: LeadFilters): Promise<Collection<Lead>> {
    const where: Prisma.LeadWhereInput = {}

    if (filters?.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive'
      }
    }
    if (filters?.email) {
      where.email = {
        contains: filters.email,
        mode: 'insensitive'
      }
    }

    const page = filters?.page || 1
    const limit = filters?.limit || 10
    const skip = (page - 1) * limit

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: {
          created_at: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.lead.count({ where })
    ])

    const mappedLeads = leads.map(
      (lead: Prisma.LeadUncheckedCreateInput) =>
        new LeadEntity(
          {
            name: lead.name,
            email: lead.email,
            phone_number: lead.phone_number,
            role: lead.role,
            birth_date:
              typeof lead.birth_date === 'string'
                ? new Date(lead.birth_date)
                : lead.birth_date,
            message: lead.message
          },
          lead.id
        )
    )

    const total_pages = Math.ceil(total / limit)

    return {
      items: mappedLeads,
      pagination: {
        total,
        page,
        limit,
        total_pages
      }
    }
  }

  async update(id: string, data: Partial<Lead>): Promise<Lead> {
    const updatedLead = await prisma.lead.update({
      where: { id },
      data
    })

    return new LeadEntity(
      {
        name: updatedLead.name,
        email: updatedLead.email,
        phone_number: updatedLead.phone_number,
        role: updatedLead.role,
        birth_date: updatedLead.birth_date,
        message: updatedLead.message
      },
      updatedLead.id
    )
  }

  async delete(id: string): Promise<void> {
    await prisma.lead.delete({
      where: { id }
    })
  }
}
