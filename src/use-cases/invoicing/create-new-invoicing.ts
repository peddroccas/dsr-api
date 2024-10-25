import type { Invoicing } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'
import { DuplicatedInvoicingError } from '../errors/duplicated-invoicing'

interface CreateNewInvoicingRequest {
  value: number
  month: number
  year: number
  storeId: string
}

interface CreateNewInvoicingResponse {
  invoicing: Invoicing
}

export async function createNewInvoicing({
  value,
  month,
  storeId,
  year,
}: CreateNewInvoicingRequest): Promise<CreateNewInvoicingResponse> {
  const date = dayjs().month(month).year(year).startOf('month').toDate()
  const invoicing = await prisma.invoicing
    .create({
      data: { value, store_id: storeId, date },
    })
    .catch(error => {
      throw new DuplicatedInvoicingError()
    })

  return { invoicing }
}
