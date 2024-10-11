import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface DeleteTaskRequest {
  id: string
}

interface DeleteTaskResponse {
  task: Task
}

export async function deleteTask({
  id,
}: DeleteTaskRequest): Promise<DeleteTaskResponse> {
  const task = await prisma.task.delete({
    where: { id },
  })

  return { task }
}
