import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'

interface GetCompletionsProps {
  status: 'APPROVED' | 'PENDING'
}

export async function getCompletions({ status }: GetCompletionsProps) {
  const startOfWeek = dayjs().startOf('week').toDate()
  const endOfWeek = dayjs().endOf('week').toDate()

  const completions = await prisma.manager.findMany({
    where: {
      completions: {
        some: {
          status,
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

  return { completions }
}
