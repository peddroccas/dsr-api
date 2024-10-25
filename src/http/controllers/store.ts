import type { FastifyInstance } from 'fastify'
import { createNewStoreRoute } from '../routes/create-new-store'

export async function storeRoutes(app: FastifyInstance) {
  app.register(createNewStoreRoute)
}
