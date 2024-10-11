import type { Completion } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'

interface CreateNewCompletionRequest {
  managerId: string
  taskId: string
  image: string
}

interface CreateNewCompletionResponse {
  completion: Completion
}

export async function createNewCompletion({
  taskId,
  managerId,
  image,
}: CreateNewCompletionRequest): Promise<CreateNewCompletionResponse> {
  const now = dayjs()
  const completion = await prisma.completion.create({
    data: {
      taskId,
      userId: managerId,
      completed_at: now.toDate(),
      image,
    },
  })

  return { completion }
}
