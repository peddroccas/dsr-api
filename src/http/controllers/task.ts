import type { FastifyInstance } from 'fastify'
import { createNewTaskRoute } from '../routes/create-new-task'
import { updateTaskRoute } from '../routes/update-task'
import { deleteTaskRoute } from '../routes/delete-task'
import { getTasksRoute } from '../routes/get-tasks'

export async function taskRoutes(app: FastifyInstance) {
  app.register(createNewTaskRoute)
  app.register(updateTaskRoute)
  app.register(deleteTaskRoute)
  app.register(getTasksRoute)
}
