import type { FastifyInstance } from 'fastify'
import { createNewTaskRoute } from '../routes/create-new-task'
import { updateTaskRoute } from '../routes/update-task'

export async function taskRoutes(app: FastifyInstance) {
  app.register(createNewTaskRoute)
  app.register(updateTaskRoute)
}
