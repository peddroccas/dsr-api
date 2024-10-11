import type { FastifyInstance } from 'fastify'
import { createNewTaskRoute } from '../routes/create-new-task'
import { updateTaskRoute } from '../routes/update-task'
import { deleteTaskRoute } from '../routes/delete-task'

export async function taskRoutes(app: FastifyInstance) {
  app.register(createNewTaskRoute)
  app.register(updateTaskRoute)
  app.register(deleteTaskRoute)
}
