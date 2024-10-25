import type { Store } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface GetStoreResponse {
  stores: Store[]
}

export async function getStores(): Promise<GetStoreResponse> {
  const stores = await prisma.store.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return { stores }
}
