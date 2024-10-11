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
          //monthlyFrequency: z.number().min(1).max(31),
        }),
      },
    },
    async (request, reply) => {
      const { title } = request.body
      const { task } = await createNewTask({ title })

      reply.status(201).send(task)
    }
  )
}
