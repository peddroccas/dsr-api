import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyRole } from '../middlewares/verify-role'
import { createNewCompletion } from '../../use-cases/completion/create-new-completion'

export const createNewCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      onRequest: [verifyJWT, verifyRole],
      schema: {
        body: z.object({
          taskId: z.string().uuid(),
          image: z.string().base64(),
        }),
      },
    },
    async (request, reply) => {
      const id = request.user.sub

      const { taskId, image } = request.body
      const { completion } = await createNewCompletion({
        managerId: id,
        taskId,
        image,
      })

      reply.status(201).send(completion)
    }
  )
}
