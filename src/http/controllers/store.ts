import type { FastifyInstance } from 'fastify'
import { createNewStoreRoute } from '../routes/create-new-store'
import { getStoresRoute } from '../routes/get-stores'

export async function storeRoutes(app: FastifyInstance) {
  app.register(createNewStoreRoute)
  app.register(getStoresRoute)
}
