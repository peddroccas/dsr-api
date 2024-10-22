import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createNewUser } from '../../use-cases/user/create-new-user'

export const createFirstAdminRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/first-admin',
    {
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
