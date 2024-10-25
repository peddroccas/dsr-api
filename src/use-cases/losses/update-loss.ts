import type { Loss } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'

interface UpdateLossRequest {
  value: number
  month: number
  year: number
  id: string
}

interface UpdateLossResponse {
  loss: Loss
}

export async function updateLoss({
  value,
  month,
  id,
  year,
}: UpdateLossRequest): Promise<UpdateLossResponse> {
  const date = dayjs(`${month}/${year}`, 'MM/YYYY').toDate()
  const loss = await prisma.loss.update({
    where: { id },
    data: { value, date },
  })

  return { loss }
}
