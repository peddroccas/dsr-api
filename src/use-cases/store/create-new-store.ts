import type { Store } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface CreateNewStoreRequest {
  name: string
}

interface CreateNewStoreResponse {
  store: Store
}

export async function createNewStore({
  name,
}: CreateNewStoreRequest): Promise<CreateNewStoreResponse> {
  const store = await prisma.store.create({
    data: {
      name: name,
    },
    select: {
      id: true,
      name: true,
    },
  })

  return { store }
}
