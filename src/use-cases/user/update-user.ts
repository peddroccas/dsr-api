import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { hash } from 'bcryptjs'
import { checkEmailAlreadyExists } from './check-email-already-exists'

interface UpdateUserRequest {
  id: string
  name: string
  email: string
}

interface UpdateUserResponse {
  user: User
}

export async function updateUser({
  id,
  name,
  email,
}: UpdateUserRequest): Promise<UpdateUserResponse> {
  await checkEmailAlreadyExists({ id, email })

  const user = await prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  })

  return { user }
}
