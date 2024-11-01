import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { checkTaskAlreadyExists } from './check-task-already-exists'

interface CreateNewTaskRequest {
  title: string
  weeklyFrequency: number
}

interface CreateNewTaskResponse {
  task: Task
}

export async function createNewTask({
  title,
  weeklyFrequency,
}: CreateNewTaskRequest): Promise<CreateNewTaskResponse> {
  await checkTaskAlreadyExists({ title })

  const task = await prisma.task.create({
    data: {
      title,
      weeklyFrequency,
    },
  })

  return { task }
}
