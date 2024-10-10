import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface DeleteUserRequest {
  id: string
}

interface DeleteUserResponse {
  user: User
}

export async function deleteUser({
  id,
}: DeleteUserRequest): Promise<DeleteUserResponse> {
  const user = await prisma.user.delete({
    where: { id },
  })

  return { user }
}
