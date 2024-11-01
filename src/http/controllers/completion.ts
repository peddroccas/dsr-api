import type { FastifyInstance } from 'fastify'
import { createNewCompletionRoute } from '../routes/create-new-completion'
import { getPendingCompletionsByManagerRoute } from '../routes/get-pending-completions'
import { approveCompletionRoute } from '../routes/approve-completion'

export async function completionRoutes(app: FastifyInstance) {
  app.register(createNewCompletionRoute)
  app.register(getPendingCompletionsByManagerRoute)
  app.register(approveCompletionRoute)
}
