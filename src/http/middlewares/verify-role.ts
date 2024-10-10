import type { FastifyReply, FastifyRequest } from 'fastify'
import { UnauthorizedError } from '../../use-cases/errors/unauthorized'

export async function verifyRole(request: FastifyRequest, reply: FastifyReply) {
  try {
    const role = request.user.role

    if (role !== 'ADMIN' && role !== 'MANAGER') {
      throw new UnauthorizedError()
    }
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
