import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { checkTaskAlreadyExists } from './check-task-already-exists'

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
  await checkTaskAlreadyExists({ title })

  const task = await prisma.task.create({
    data: {
      title,
      //monthly_frequency: monthlyFrequency,
    },
  })

  return { task }
}
