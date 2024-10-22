import type { User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import { InvalidCredentialsError } from '../errors/invalid-credentials'

interface GetProfileRequest {
  id: string
}

interface GetProfileResponse {
  profile: Omit<User, 'password_hash'>
}

export async function getProfile({
  id,
}: GetProfileRequest): Promise<GetProfileResponse> {
  const profile = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  })

  if (!profile) {
    throw new InvalidCredentialsError()
  }

  return { profile }
}
