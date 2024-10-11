import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { deleteTask } from '../../use-cases/task/delete-task'
import { verifyAdmin } from '../middlewares/verify-admin'

export const deleteTaskRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/tasks',
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

      const { task } = await deleteTask({ id })

      reply.status(200).send(task)
    }
  )
}
