import type { Manager } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface CreateNewManagerRequest {
  userId: string
  storeId: string
}

interface CreateNewManagerResponse {
  manager: Manager
}

export async function createNewManager({
  userId,
  storeId,
}: CreateNewManagerRequest): Promise<CreateNewManagerResponse> {
  const manager = await prisma.manager.create({
    data: { userId, storeId },
  })

  return { manager }
}
