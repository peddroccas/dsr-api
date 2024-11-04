import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'

interface GetCompletionsProps {
  id: string
}

export async function getCompletionsByManager({ id }: GetCompletionsProps) {
  const startOfWeek = dayjs().startOf('week').toDate()
  const endOfWeek = dayjs().endOf('week').toDate()

  const completions = await prisma.completion.findMany({
    where: {
      manager: { userId: id },
      completedAt: { gte: startOfWeek, lte: endOfWeek },
    },
  })

  return { completions }
}
