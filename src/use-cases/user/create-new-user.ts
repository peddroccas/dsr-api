import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'
import { DuplicatedCredentialsError } from '../errors/duplicated-credentials'

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

  const hasUserWithEmail = Boolean(
    await prisma.user.findUnique({
      where: { email: email },
    })
  )

  if (hasUserWithEmail) {
    throw new DuplicatedCredentialsError()
  }

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
