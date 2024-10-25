import type { Invoicing } from '@prisma/client'
import { prisma } from '../../lib/prisma'

interface DeleteInvoicingRequest {
  id: string
}

interface DeleteInvoicingResponse {
  invoicing: Invoicing
}

export async function DeleteInvoicing({
  id,
}: DeleteInvoicingRequest): Promise<DeleteInvoicingResponse> {
  const invoicing = await prisma.invoicing.delete({
    where: { id },
  })

  return { invoicing }
}
