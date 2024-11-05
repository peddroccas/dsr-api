import type { Completion } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'
import { getManager } from '../manager/get-manager'

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
  const { manager } = await getManager({ id: managerId })
  const completion = await prisma.completion.create({
    data: {
      taskId,
      managerId: manager.id,
      image,
    },
  })

  return { completion }
}
