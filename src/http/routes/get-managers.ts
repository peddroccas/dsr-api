import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { getManagers } from '../../use-cases/user/get-managers'

export const getManagersRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/managers',
    {
      onRequest: [verifyJWT, verifyAdmin],
    },
    async (request, reply) => {
      const { managers } = await getManagers()

      reply.status(201).send(managers)
    }
  )
}
