import type { Completion } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface ApproveCompletionRequest {
  id: string
}

interface ApproveCompletionResponse {
  completion: Completion
}

export async function approveCompletion({
  id,
}: ApproveCompletionRequest): Promise<ApproveCompletionResponse> {
  const completion = await prisma.completion.update({
    where: { id },
    data: { status: 'APPROVED' },
  })

  return { completion }
}
