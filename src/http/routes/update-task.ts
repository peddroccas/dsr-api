import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { updateTask } from '../../use-cases/task/update-task'

export const updateTaskRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/tasks',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          id: z.string().uuid(),
          title: z.string(),
          weeklyFrequency: z.number().min(1).max(31),
        }),
      },
    },
    async (request, reply) => {
      const { id, title, weeklyFrequency } = request.body
      const { task } = await updateTask({ id, title, weeklyFrequency })

      reply.status(200).send(task)
    }
  )
}
