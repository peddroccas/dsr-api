import type { Manager } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'

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
    data: { user_id: userId, store_id: storeId },
  })

  return { manager }
}
