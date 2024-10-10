import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { login } from '../../use-cases/user/login'

export const loginRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/login',
    {
      schema: {
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const { user } = await login({ email, password })

      const token = await reply.jwtSign(
        { role: user.role },
        {
          sign: {
            sub: user.id,
          },
        }
      )

      reply.status(201).send({ token })
    }
  )
}
