import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createNewUser } from '../../use-cases/user/create-new-user'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { createNewManager } from '../../use-cases/manager/create-new-manager'

export const createNewManagerRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/managers',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          storeId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, storeId } = request.body
      const { user } = await createNewUser({ name, email, role: 'MANAGER' })
      const { manager } = await createNewManager({ userId: user.id, storeId })

      reply.status(201).send(manager)
    }
  )
}
