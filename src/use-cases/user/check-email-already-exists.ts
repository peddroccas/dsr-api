import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { DuplicatedCredentialsError } from '../errors/duplicated-credentials'

interface CheckEmailAlreadyExistsRequest {
  email: string
}

export async function checkEmailAlreadyExists({
  email,
}: CheckEmailAlreadyExistsRequest) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  const emailAlreadyExists = Boolean(user)

  if (emailAlreadyExists) {
    throw new DuplicatedCredentialsError()
  }
}
