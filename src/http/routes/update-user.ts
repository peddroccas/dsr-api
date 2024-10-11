import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyRole } from '../middlewares/verify-role'
import { updateUser } from '../../use-cases/user/update-user'
import { UnauthorizedError } from '../../use-cases/errors/unauthorized'

export const updateUserRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/users',
    {
      onRequest: [verifyJWT, verifyRole],
      schema: {
        body: z.object({
          userId: z.string().uuid().optional(),
          name: z.string(),
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { userId, email, name } = request.body

      const id = () => {
        if (!userId) {
          return request.user.sub
        }
        if (request.user.role !== 'ADMIN') {
          throw new UnauthorizedError()
        }
        return userId
      }

      const { user } = await updateUser({ id: id(), email, name })

      reply.status(200).send(user)
    }
  )
}
