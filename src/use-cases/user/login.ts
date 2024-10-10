import { compare } from 'bcryptjs'
import { prisma } from '../../lib/prisma'
import { InvalidCredentialsError } from '../errors/invalid-credentials'
import type { User } from '@prisma/client'

interface LoginRequest {
  email: string
  password: string
}

interface LoginResponse {
  user: User
}

export async function login({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  // Busca o catequista pelo email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new InvalidCredentialsError()
  }

  const doesPasswordMatches = await compare(password, user.password_hash)

  // Se a senha for inválida, lança um erro
  if (!doesPasswordMatches) {
    throw new InvalidCredentialsError()
  }

  return { user }
}
