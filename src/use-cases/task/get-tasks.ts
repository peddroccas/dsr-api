import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface GetTasksResponse {
  tasks: Task[]
}

export async function getTasks(): Promise<GetTasksResponse> {
  const tasks = await prisma.task.findMany()

  return { tasks }
}
