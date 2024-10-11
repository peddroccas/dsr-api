import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface getManagersResponse {
  managers: User[]
}

export async function getManagers(): Promise<getManagersResponse> {
  const managers = await prisma.user.findMany({
    where: { role: 'MANAGER' },
  })

  return { managers }
}
