import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { getPendingTasksByManager } from '../../use-cases/task/get-pending-tasks-by-manager'

export const getPendingTasksByManagerRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/managers/task',
      {
        onRequest: [verifyJWT, verifyAdmin],
      },
      async (request, reply) => {
        const { remainingTasks } = await getPendingTasksByManager({
          managerId: '9fa4bff9-999c-4c7e-8dbd-4e0785e1a886',
        })

        reply.status(201).send(remainingTasks)
      }
    )
  }
