import { prisma } from '../../lib/prisma'
import { DuplicatedCredentialsError } from '../errors/duplicated-credentials'

interface CheckEmailAlreadyExistsRequest {
  id?: string
  email: string
}

export async function checkEmailAlreadyExists({
  id,
  email,
}: CheckEmailAlreadyExistsRequest) {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  const emailAlreadyExists = Boolean(user)

  if (!id) {
    if (emailAlreadyExists) {
      throw new DuplicatedCredentialsError()
    }
  }
  if (user) {
    if (user.id !== id && emailAlreadyExists) {
      throw new DuplicatedCredentialsError()
    }
  }
}
