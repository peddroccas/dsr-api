import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { createNewStore } from '../../use-cases/store/create-new-store'

export const createNewStoreRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/stores',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          name: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name } = request.body
      const { store } = await createNewStore({
        name,
      })

      reply.status(201).send(store)
    }
  )
}
