import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { getPendingTasksByManager } from '../../use-cases/task/get-pending-tasks-by-manager'

export const getPendingTasksByManagerRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/manager/task',
      {
        onRequest: [verifyJWT],
      },
      async (request, reply) => {
        const managerId = request.user.sub
        const { remainingTasks } = await getPendingTasksByManager({
          managerId,
        })

        reply.status(200).send(remainingTasks)
      }
    )
  }
