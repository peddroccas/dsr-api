import { prisma } from '../../lib/prisma'

interface getManagersResponse {
  managers: {
    name: string
    store: string
    id: string
    email: string
  }[]
}

export async function getManagers(): Promise<getManagersResponse> {
  const managers = await prisma.user
    .findMany({
      where: { role: 'MANAGER' },
      orderBy: { manager: { store: { name: 'asc' } } },
      select: {
        id: true,
        name: true,
        email: true,
        manager: { select: { store: { select: { name: true } } } },
      },
    })
    .then(managers =>
      managers.map(managerResponse => {
        const manager = {
          id: managerResponse.id,
          name: managerResponse.name,
          email: managerResponse.email,
          store: managerResponse.manager!.store.name,
        }
        return manager
      })
    )
  return { managers }
}
