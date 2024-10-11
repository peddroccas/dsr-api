import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { checkTaskAlreadyExists } from './check-task-already-exists'

interface UpdateRequest {
  id: string
  title: string
  monthlyFrequency: number
}

interface UpdateResponse {
  task: Task
}

export async function updateTask({
  id,
  title,
  monthlyFrequency,
}: UpdateRequest): Promise<UpdateResponse> {
  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      monthly_frequency: monthlyFrequency,
    },
  })

  return { task }
}
