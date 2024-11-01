import type { Completion } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface DeleteCompletionRequest {
  id: string
}

interface DeleteCompletionResponse {
  completion: Completion
}

export async function deleteCompletion({
  id,
}: DeleteCompletionRequest): Promise<DeleteCompletionResponse> {
  const completion = await prisma.completion.delete({
    where: { id },
  })

  return { completion }
}
