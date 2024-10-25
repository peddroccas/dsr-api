import type { FastifyInstance } from 'fastify'
import { createNewLossRoute } from '../routes/create-new-loss'
import { updateLossRoute } from '../routes/update-loss'
import { deleteLossRoute } from '../routes/delete-loss'
import { getLossesByStoreRoute } from '../routes/get-losses-by-store'

export async function lossRoutes(app: FastifyInstance) {
  app.register(createNewLossRoute)
  app.register(updateLossRoute)
  app.register(deleteLossRoute)
  app.register(getLossesByStoreRoute)
}
