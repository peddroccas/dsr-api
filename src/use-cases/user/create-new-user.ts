import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'
import { checkEmailAlreadyExists } from './check-email-already-exists'

interface CreateNewUserRequest {
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER'
}

interface CreateNewUserResponse {
  user: Omit<User, 'password_hash' | 'store_id'>
}

export async function createNewUser({
  name,
  email,
  role,
}: CreateNewUserRequest): Promise<CreateNewUserResponse> {
  const password_hash = await hash('123456', 6)

  await checkEmailAlreadyExists({ email })

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      role: role,
      password_hash,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  return { user }
}
