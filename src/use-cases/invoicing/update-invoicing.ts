import type { Invoicing } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'

interface UpdateInvoicingRequest {
  value: number
  month: number
  year: number
  id: string
}

interface UpdateInvoicingResponse {
  invoicing: Invoicing
}

export async function updateInvoicing({
  value,
  month,
  id,
  year,
}: UpdateInvoicingRequest): Promise<UpdateInvoicingResponse> {
  const date = dayjs(`${month}/${year}`, 'MM/YYYY').toDate()
  const invoicing = await prisma.invoicing.update({
    where: { id },
    data: { value, date },
  })

  return { invoicing }
}
