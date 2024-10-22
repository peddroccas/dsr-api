import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

import { getProfile } from '../../use-cases/user/get-profile'

export const profileRoute: FastifyPluginAsyncZod = async app => {
  app.post('/profile', async (request, reply) => {
    const id = request.user.sub

    const { profile } = await getProfile({ id })

    reply.status(201).send({ profile })
  })
}
