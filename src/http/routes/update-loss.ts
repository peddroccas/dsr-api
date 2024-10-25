import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { updateLoss } from '../../use-cases/losses/update-loss'

export const updateLossRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/losses',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          value: z.number(),
          month: z.number(),
          year: z.number(),
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { value, month, id, year } = request.body
      const { loss } = await updateLoss({
        value,
        month,
        id,
        year,
      })

      reply.status(201).send(loss)
    }
  )
}
