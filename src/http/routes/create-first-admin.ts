import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createNewUser } from '../../use-cases/user/create-new-user'
import { hasAdmins } from '../../use-cases/user/has-admin'
import { UnauthorizedError } from '../../use-cases/errors/unauthorized'

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
      const { admins } = await hasAdmins()
      console.log(admins)
      if (admins.length) {
        throw new UnauthorizedError()
      }

      const { name, email, role } = request.body
      const { user } = await createNewUser({ name, email, role })

      reply.status(201).send(user)
    }
  )
}
