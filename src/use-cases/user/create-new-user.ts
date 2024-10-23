import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'
import { checkEmailAlreadyExists } from './check-email-already-exists'

interface CreateNewUserRequest {
  name: string
  email: string
  role: 'ADMIN' | 'MANAGER'
  storeId: string | undefined
}

interface CreateNewUserResponse {
  user: Omit<User, 'password_hash' | 'store_id'>
}

export async function createNewUser({
  name,
  email,
  role,
  storeId,
}: CreateNewUserRequest): Promise<CreateNewUserResponse> {
  const password_hash = await hash('123456', 6)

  await checkEmailAlreadyExists({ email })

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      role: role,
      store_id: storeId,
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
