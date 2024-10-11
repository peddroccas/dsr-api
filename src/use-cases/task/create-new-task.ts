import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface CreateNewTaskRequest {
  title: string
  //monthlyFrequency: number
}

interface CreateNewTaskResponse {
  task: Task
}

export async function createNewTask({
  title,
  //monthlyFrequency,
}: CreateNewTaskRequest): Promise<CreateNewTaskResponse> {
  const task = await prisma.task.create({
    data: {
      title,
      //monthly_frequency: monthlyFrequency,
    },
  })

  return { task }
}
