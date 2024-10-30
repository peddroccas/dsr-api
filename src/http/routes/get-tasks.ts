import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'

import { getTasks } from '../../use-cases/task/get-tasks'
import { verifyRole } from '../middlewares/verify-role'

export const getTasksRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/tasks',
    {
      onRequest: [verifyJWT, verifyRole],
    },
    async (request, reply) => {
      const { tasks } = await getTasks()

      reply.status(200).send(tasks)
    }
  )
}
