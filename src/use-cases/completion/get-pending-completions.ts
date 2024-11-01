import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'
import { getManager } from '../manager/get-manager'

interface GetPendingCompletionsResponse {
  tasks: Task[]
}

export async function getPendingCompletions() {
  const startOfWeek = dayjs().startOf('week').toDate()
  const endOfWeek = dayjs().endOf('week').toDate()

  const pendingCompletions = await prisma.manager.findMany({
    where: {
      completions: {
        some: {
          status: 'PENDING',
          completedAt: { gte: startOfWeek, lte: endOfWeek },
        },
      },
    },
    select: {
      user: { select: { name: true, id: true } },
      completions: {
        where: {
          status: 'PENDING',
          completedAt: { gte: startOfWeek, lte: endOfWeek },
        },
        select: {
          id: true,
          image: true,
          completedAt: true,
          taskId: true,
        },
        orderBy: {
          completedAt: 'asc',
        },
      },
    },
  })

  return { pendingCompletions }
}
