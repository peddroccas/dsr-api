import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createNewUser } from '../../use-cases/user/create-new-user'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'

export const createNewAdminRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/admin',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email } = request.body
      const { user } = await createNewUser({ name, email, role: 'ADMIN' })

      reply.status(201).send(user)
    }
  )
}
