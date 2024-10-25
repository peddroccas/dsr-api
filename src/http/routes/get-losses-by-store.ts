import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { z } from 'zod'
import { getLossesByStore } from '../../use-cases/losses/get-losses-by-store'

export const getLossesByStoreRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/losses/:id',
    {
      onRequest: [verifyJWT],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { losses } = await getLossesByStore({
        storeId: id,
      })

      reply.status(200).send(losses)
    }
  )
}
