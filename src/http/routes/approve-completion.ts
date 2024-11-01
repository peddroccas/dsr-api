import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { approveCompletion } from '../../use-cases/completion/approve-completion'

export const approveCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/completions/approve',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.body
      const { completion } = await approveCompletion({ id })

      reply.status(200).send(completion)
    }
  )
}
