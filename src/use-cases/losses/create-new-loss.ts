import type { Loss, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'
import { DuplicatedLossError } from '../errors/duplicated-loss'

interface CreateNewLossRequest {
  value: number
  month: number
  year: number
  storeId: string
}

interface CreateNewLossResponse {
  loss: Loss
}

export async function createNewLoss({
  value,
  month,
  storeId,
  year,
}: CreateNewLossRequest): Promise<CreateNewLossResponse> {
  const date = dayjs().month(month).year(year).startOf('month').toDate()
  const loss = await prisma.loss
    .create({
      data: { value, store_id: storeId, date },
    })
    .catch(error => {
      throw new DuplicatedLossError()
    })

  return { loss }
}
