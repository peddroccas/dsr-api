import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'

interface UpdatePasswordRequest {
  id: string
  password: string
}

interface UpdatePasswordResponse {
  user: User
}

export async function updatePassword({
  id,
  password,
}: UpdatePasswordRequest): Promise<UpdatePasswordResponse> {
  const password_hash = await hash(password, 6)

  const user = await prisma.user.update({
    where: { id },
    data: {
      password_hash,
    },
  })

  return { user }
}
