import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createNewUser } from '../../use-cases/user/create-new-user'
import { verifyHasAdmin } from '../middlewares/verify-has-admin'

export const createNewUserRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/users',
    {
      onRequest: [verifyHasAdmin],
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          role: z.enum(['ADMIN', 'MANAGER']),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, role } = request.body
      const { user } = await createNewUser({ name, email, role })

      reply.status(201).send(user)
    }
  )
}
