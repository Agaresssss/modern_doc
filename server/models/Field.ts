import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { z } from 'zod'

class Field {
  static async createField(req: Request, res: Response) {
    const prisma = new PrismaClient()
    const { name, officialName, description, type } = req.body
    const schema = z.object({
      name: z.string(),
      officialName: z.string(),
      description: z.string(),
      type: z.enum([
        'text',
        'number',
        'date',
        'singleSelect',
        'multipleSelect',
      ]),
    })
    try {
      schema.parse({ name, officialName, description, type })
      const field = await prisma.field.create({
        data: {
          name,
          officialName,
          description,
          type,
        },
      })
      return res.status(200).json(field)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async getAllField(req: Request, res: Response) {
    const prisma = new PrismaClient()
    try {
      const fields = await prisma.field.findMany()
      return res.status(200).json(fields)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static async editFieldOfficialName(req: Request, res: Response) {
    const prisma = new PrismaClient()
    let { id, officialName } = req.body
    const schema = z.object({
      id: z.string().uuid(),
      officialName: z.string(),
    })
    try {
      schema.parse({ id, officialName })
      const editField = await prisma.field.update({
        where: {
          id,
        },
        data: {
          officialName,
        },
      })
      return res.status(200).json(editField)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }
}

export default Field