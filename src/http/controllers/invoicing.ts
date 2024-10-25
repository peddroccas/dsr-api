import type { FastifyInstance } from 'fastify'
import { createNewInvoicingRoute } from '../routes/create-new-invoicing'
import { updateInvoicingRoute } from '../routes/update-invoicing'
import { deleteInvoicingRoute } from '../routes/delete-invoicing'
import { getInvoicingsByStoreRoute } from '../routes/get-invoicings-by-store'

export async function invoicingRoutes(app: FastifyInstance) {
  app.register(createNewInvoicingRoute)
  app.register(updateInvoicingRoute)
  app.register(deleteInvoicingRoute)
  app.register(getInvoicingsByStoreRoute)
}
