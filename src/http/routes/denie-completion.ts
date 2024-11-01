import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { deleteCompletion } from '../../use-cases/completion/delete-completion'

export const denieCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completions/denie',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const { completion } = await deleteCompletion({ id })

      reply.status(200).send(completion)
    }
  )
}
