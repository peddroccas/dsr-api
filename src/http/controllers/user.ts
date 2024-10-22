import type { FastifyInstance } from 'fastify'
import { createNewUserRoute } from '../routes/create-new-user'
import { updateUserPasswordRoute } from '../routes/update-user-password'
import { loginRoute } from '../routes/login'
import { updateUserRoute } from '../routes/update-user'
import { deleteUserRoute } from '../routes/delete-user'
import { getManagersRoute } from '../routes/get-managers'
import { profileRoute } from '../routes/profile'
import { createFirstAdminRoute } from '../routes/create-first-admin'

export async function userRoutes(app: FastifyInstance) {
  app.register(loginRoute)
  app.register(createNewUserRoute)
  app.register(updateUserPasswordRoute)
  app.register(updateUserRoute)
  app.register(deleteUserRoute)
  app.register(getManagersRoute)
  app.register(profileRoute)
  app.register(createFirstAdminRoute)
}
