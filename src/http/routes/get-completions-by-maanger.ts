import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { getCompletionsByManager } from '../../use-cases/completion/get-completions-by-manager'
import { verifyRole } from '../middlewares/verify-role'

export const getCompletionsByManagerRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/completions',
      {
        onRequest: [verifyJWT, verifyRole],
      },
      async (request, reply) => {
        const id = request.user.sub
        const { completions } = await getCompletionsByManager({
          id,
        })

        reply.status(200).send(completions)
      }
    )
  }
