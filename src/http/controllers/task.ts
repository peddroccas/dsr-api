import type { FastifyInstance } from 'fastify'
import { createNewTaskRoute } from '../routes/create-new-task'

export async function taskRoutes(app: FastifyInstance) {
  app.register(createNewTaskRoute)
}
