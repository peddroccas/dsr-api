import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getProfile } from '../../use-cases/user/get-profile'
import { verifyJWT } from '../middlewares/verify-jwt'

export const profileRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/profile',
    {
      onRequest: [verifyJWT],
    },
    async (request, reply) => {
      const id = request.user.sub

      const { profile } = await getProfile({ id })

      reply.status(201).send(profile)
    }
  )
}
