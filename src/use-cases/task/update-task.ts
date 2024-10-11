import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { checkTaskAlreadyExists } from './check-task-already-exists'

interface UpdateNewTaskRequest {
  id: string
  title: string
  monthlyFrequency: number
}

interface UpdateNewTaskResponse {
  task: Task
}

export async function updateTask({
  id,
  title,
  monthlyFrequency,
}: UpdateNewTaskRequest): Promise<UpdateNewTaskResponse> {
  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      monthly_frequency: monthlyFrequency,
    },
  })

  return { task }
}
