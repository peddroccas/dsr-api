import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface UpdateRequest {
  id: string
  title: string
  weeklyFrequency: number
}

interface UpdateResponse {
  task: Task
}

export async function updateTask({
  id,
  title,
  weeklyFrequency,
}: UpdateRequest): Promise<UpdateResponse> {
  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      weekly_frequency: weeklyFrequency,
    },
  })

  return { task }
}
