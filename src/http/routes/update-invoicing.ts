import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'
import { updateInvoicing } from '../../use-cases/invoicing/update-invoicing'

export const updateInvoicingRoute: FastifyPluginAsyncZod = async app => {
  app.put(
    '/invoicings',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          value: z.number(),
          month: z.number(),
          year: z.number(),
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { value, month, id, year } = request.body
      const { invoicing } = await updateInvoicing({
        value,
        month,
        id,
        year,
      })

      reply.status(200).send(invoicing)
    }
  )
}
