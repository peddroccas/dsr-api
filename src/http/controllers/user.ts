import type { FastifyInstance } from 'fastify'
import { createNewUserRoute } from '../routes/create-new-user'

export async function userRoutes(app: FastifyInstance) {
  app.register(createNewUserRoute)
}
