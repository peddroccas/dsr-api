import type { FastifyInstance } from 'fastify'
import { createNewCompletionRoute } from '../routes/create-new-completion'

export async function completionRoutes(app: FastifyInstance) {
  app.register(createNewCompletionRoute)
}
