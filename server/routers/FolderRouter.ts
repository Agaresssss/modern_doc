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
    this.router.get('/latest-folders', this.controller.getLatestFolder)
    this.router.get('/search/:name', this.controller.searchByName)
    this.router.get('/search/', this.controller.getAll)
    this.router.put('/add-note/:userFolderId', this.controller.addNote)
    this.router.get('/get-field/', this.controller.getField)
    this.router.post('/new/:folderId', this.controller.saveFolder)
  }
}

export default new FolderRouter().getRouter()
