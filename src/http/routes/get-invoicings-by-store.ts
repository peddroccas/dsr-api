import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { verifyJWT } from '../middlewares/verify-jwt'
import { getInvoicingsByStore } from '../../use-cases/invoicing/get-invoicings-by-store'
import { z } from 'zod'

export const getInvoicingsByStoreRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/invoicings/:id',
    {
      onRequest: [verifyJWT],
      schema: {
        params: z.object({
          id: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { id } = request.params
      const { invoicings } = await getInvoicingsByStore({
        storeId: id,
      })

      reply.status(200).send(invoicings)
    }
  )
}
