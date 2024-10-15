import { prisma } from '../../lib/prisma'

interface HasAdminResponse {
  hasAdmin: boolean
}

export async function hasAdmins(): Promise<HasAdminResponse> {
  const admins = await prisma.user.findMany({
    where: { role: 'ADMIN' },
  })

  if (admins.length) {
    return { hasAdmin: true }
  }

  return { hasAdmin: false }
}
