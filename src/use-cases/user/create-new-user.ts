import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'

interface CreateNewUserRequest {
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER'
}

interface CreateNewUserResponse {
  user: User
}

export async function createNewUser({
  name,
  email,
  role,
}: CreateNewUserRequest): Promise<CreateNewUserResponse> {
  const password_hash = await hash('123456', 6)
  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      role: role,
      password_hash,
    },
  })

  return { user }
}
