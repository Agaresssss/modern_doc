import { Request, Response } from 'express'
import * as Yup from 'yup'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import checkCitizenId from '../utils/checkCitizenId'

class Form {
  static addTag = async (req: Request, res: Response) => {
    const { name } = req.body
    const prisma = new PrismaClient()
    try {
      const tag = await prisma.tag.create({
        data: {
          name,
        },
      })
      return res.status(200).json(tag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static getTag = async (req: Request, res: Response) => {
    const prisma = new PrismaClient()
    try {
      const tags = await prisma.tag.findMany()
      return res.status(200).json(tags)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static addTagToFolder = async (req: Request, res: Response) => {
    const { folderId, tagId } = req.body
    const prisma = new PrismaClient()
    try {
      const folderTag = await prisma.folderTag.create({
        data: {
          folderId,
          tagId,
        },
      })
      return res.status(200).json(folderTag)
    } catch (err) {
      return res.status(500).json({ message: err })
    }
  }

  static addFolder = async (req: Request, res: Response) => {
    
  }
}

export default Form
