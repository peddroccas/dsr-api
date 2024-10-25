import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { DeleteInvoicing } from '../../use-cases/invoicing/delete-invoicing'

export const deleteInvoicingRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/invoicings',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const { invoicing } = await DeleteInvoicing({ id })

      reply.status(200).send(invoicing)
    }
  )
}
