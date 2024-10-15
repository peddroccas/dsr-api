import type { FastifyInstance } from 'fastify'
import { createNewTaskRoute } from '../routes/create-new-task'
import { updateTaskRoute } from '../routes/update-task'
import { deleteTaskRoute } from '../routes/delete-task'
import { getTasksRoute } from '../routes/get-tasks'
import { getPendingTasksByManagerRoute } from '../routes/get-pending-tasks-by-manager'
import { getAllPendingTasksByManagerRoute } from '../routes/get-pending-tasks-by-managers'

export async function taskRoutes(app: FastifyInstance) {
  app.register(createNewTaskRoute)
  app.register(updateTaskRoute)
  app.register(deleteTaskRoute)
  app.register(getTasksRoute)
  app.register(getPendingTasksByManagerRoute)
  app.register(getAllPendingTasksByManagerRoute)
}
