import type { Loss } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface DeleteLossRequest {
  id: string
}

interface DeleteLossResponse {
  loss: Loss
}

export async function deleteLoss({
  id,
}: DeleteLossRequest): Promise<DeleteLossResponse> {
  const loss = await prisma.loss.delete({
    where: { id },
  })

  return { loss }
}
