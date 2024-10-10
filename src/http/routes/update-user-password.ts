import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { updatePassword } from '../../use-cases/user/update-password'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyRole } from '../middlewares/verify-role'

export const updateUserPasswordRoute: FastifyPluginAsyncZod = async app => {
  app.patch(
    '/users/change-password',
    {
      onRequest: [verifyJWT, verifyRole],
      schema: {
        body: z.object({
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const id = request.user.sub

      const { password } = request.body
      const { user } = await updatePassword({ id, password })

      reply.status(201).send(user)
    }
  )
}
