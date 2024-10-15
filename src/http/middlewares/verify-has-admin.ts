import type { FastifyReply, FastifyRequest } from 'fastify'
import { hasAdmins } from '../../use-cases/user/has-admin'
import { verifyAdmin } from './verify-admin'
import { verifyJWT } from './verify-jwt'

export async function verifyHasAdmin(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { hasAdmin } = await hasAdmins()
    if (hasAdmin) {
      await verifyJWT(request, reply)
      await verifyAdmin(request, reply)
    }
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
