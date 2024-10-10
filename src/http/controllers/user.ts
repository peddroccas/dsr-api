import type { FastifyInstance } from 'fastify'
import { createNewUserRoute } from '../routes/create-new-user'
import { updateUserPasswordRoute } from '../routes/update-user-password'
import { loginRoute } from '../routes/login'
import { updateUserRoute } from '../routes/update-user'

export async function userRoutes(app: FastifyInstance) {
  app.register(loginRoute)
  app.register(createNewUserRoute)
  app.register(updateUserPasswordRoute)
  app.register(updateUserRoute)
}
