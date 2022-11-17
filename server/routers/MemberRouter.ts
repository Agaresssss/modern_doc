import { NextFunction, Request, Response, Router } from 'express'
import MemberController from '@controllers/MemberController'

class UserRouter {
  private router = Router()
  private controller = MemberController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.post('/', this.controller.addMember)
    this.router.post('/:id', this.controller.editMember)
    this.router.delete('/:id', this.controller.deleteMember)
  }
}

export default new UserRouter().getRouter()
