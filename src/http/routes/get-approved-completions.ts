import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { getCompletions } from '../../use-cases/completion/get-completions'

export const getApprovedCompletionsByManagerRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/completions/approved',
      {
        onRequest: [verifyJWT, verifyAdmin],
      },
      async (request, reply) => {
        const { completions } = await getCompletions({
          status: 'APPROVED',
        })

        reply.status(200).send(completions)
      }
    )
  }
