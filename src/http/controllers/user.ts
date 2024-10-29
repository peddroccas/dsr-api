import type { FastifyInstance } from 'fastify'
import { createNewAdminRoute } from '../routes/create-new-admin'
import { updateUserPasswordRoute } from '../routes/update-user-password'
import { loginRoute } from '../routes/login'
import { updateUserRoute } from '../routes/update-user'
import { deleteUserRoute } from '../routes/delete-user'
import { getManagersRoute } from '../routes/get-managers'
import { profileRoute } from '../routes/profile'
import { createFirstAdminRoute } from '../routes/create-first-admin'
import { createNewManagerRoute } from '../routes/create-manager'

export async function userRoutes(app: FastifyInstance) {
  app.register(loginRoute)
  app.register(updateUserPasswordRoute)
  app.register(deleteUserRoute)
  app.register(updateUserRoute)
  app.register(profileRoute)

  // Admins
  app.register(createNewAdminRoute)
  app.register(createFirstAdminRoute)

  // Managers
  app.register(createNewManagerRoute)

  app.register(getManagersRoute)
}
