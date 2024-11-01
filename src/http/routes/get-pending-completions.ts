import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { getPendingCompletions } from '../../use-cases/completion/get-pending-completions'

export const getPendingCompletionsByManagerRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/completions/pending',
      {
        onRequest: [verifyJWT, verifyAdmin],
      },
      async (request, reply) => {
        const { pendingCompletions } = await getPendingCompletions()

        reply.status(200).send(pendingCompletions)
      }
    )
  }
