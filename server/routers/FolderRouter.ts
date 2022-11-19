import { NextFunction, Request, Response, Router } from 'express'
import FolderController from '@controllers/FolderController'

class FolderRouter {
  private router = Router()
  private controller = FolderController

  constructor() {
    this.configureRoutes()
  }

  getRouter = (): Router => {
    return this.router
  }

  configureRoutes = (): void => {
    this.router.get('/get-by-id/:id', this.controller.getFolderById)
  }
}

export default new FolderRouter().getRouter()
