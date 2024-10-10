import type { FastifyInstance } from 'fastify'
import { createNewUserRoute } from '../routes/create-new-user'
import { updateUserPasswordRoute } from '../routes/update-user-password'

export async function userRoutes(app: FastifyInstance) {
  app.register(createNewUserRoute)
  app.register(updateUserPasswordRoute)
}
