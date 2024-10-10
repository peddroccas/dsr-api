import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { deleteUser } from '../../use-cases/user/delete-user'
import { verifyAdmin } from '../middlewares/verify-admin'

export const deleteUserRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/users',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.body

      const { user } = await deleteUser({ id })

      reply.status(200).send(user)
    }
  )
}
