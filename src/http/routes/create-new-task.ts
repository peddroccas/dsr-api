import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { createNewTask } from '../../use-cases/task/create-new-task'

export const createNewTaskRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/tasks',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          title: z.string(),
          weeklyFrequency: z.number().min(1).max(7),
        }),
      },
    },
    async (request, reply) => {
      const { title, weeklyFrequency } = request.body
      const { task } = await createNewTask({ title, weeklyFrequency })

      reply.status(201).send(task)
    }
  )
}
