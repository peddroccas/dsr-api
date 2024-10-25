import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { deleteLoss } from '../../use-cases/losses/delete-loss'

export const deleteLossRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/losses',
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

      const { loss } = await deleteLoss({ id })

      reply.status(200).send(loss)
    }
  )
}
