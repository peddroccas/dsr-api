import type { Manager } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface GetManagerRequest {
  id: string
}

interface GetManagerResponse {
  manager: Manager
}

export async function getManager({
  id,
}: GetManagerRequest): Promise<GetManagerResponse> {
  const manager = await prisma.manager.findUnique({ where: { userId: id } })

  if (!manager) {
    throw new Error('Invalid manager')
  }

  return { manager }
}
