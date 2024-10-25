import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { getStores } from '../../use-cases/store/get-stores'

export const getStoresRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/stores',
    {
      onRequest: [verifyJWT, verifyAdmin],
    },
    async (request, reply) => {
      const { stores } = await getStores()

      reply.status(201).send(stores)
    }
  )
}
