import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface HasAdminResponse {
  admins: User[]
}

export async function hasAdmins(): Promise<HasAdminResponse> {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
  })

  return { admins }
}
