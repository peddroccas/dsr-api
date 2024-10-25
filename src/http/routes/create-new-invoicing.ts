import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { createNewInvoicing } from '../../use-cases/invoicing/create-new-invoicing'
import { verifyJWT } from '../middlewares/verify-jwt'
import { verifyAdmin } from '../middlewares/verify-admin'

export const createNewInvoicingRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/invoicings',
    {
      onRequest: [verifyJWT, verifyAdmin],
      schema: {
        body: z.object({
          value: z.number(),
          month: z.number(),
          year: z.number(),
          storeId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { value, month, storeId, year } = request.body
      const { invoicing } = await createNewInvoicing({
        value,
        month,
        storeId,
        year,
      })

      reply.status(201).send(invoicing)
    }
  )
}
