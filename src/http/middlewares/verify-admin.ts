import type { FastifyReply, FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../../use-cases/errors/unauthorized'
import { getProfile } from '../../use-cases/user/get-profile'

export async function verifyAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const id = request.user.sub

    if (!id) {
      throw new UnauthorizedError()
    }

    const { profile } = await getProfile({ id })

    if (profile.role !== 'ADMIN') {
      throw new UnauthorizedError()
    }
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
