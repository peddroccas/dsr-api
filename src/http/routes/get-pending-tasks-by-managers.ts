import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { getPendingTasksByManager } from '../../use-cases/task/get-pending-tasks-by-manager'
import { verifyAdmin } from '../middlewares/verify-admin'
import { getManagers } from '../../use-cases/user/get-managers'

export const getPendingTasksByManagerRoute: FastifyPluginAsyncZod =
  async app => {
    app.get(
      '/managers/tasks',
      {
        onRequest: [verifyJWT, verifyAdmin],
      },
      async (request, reply) => {
        const managersRemainingTasks = []
        const { managers } = await getManagers()

        for (const manager of managers) {
          const { remainingTasks } = await getPendingTasksByManager({
            managerId: manager.id,
          })
          managersRemainingTasks.push({ manager, remainingTasks })
        }

        reply.status(200).send(managersRemainingTasks)
      }
    )
  }
