import { prisma } from '../../lib/prisma'
import { DuplicatedTaskError } from '../errors/duplicated-task'

interface CheckTaskAlreadyExistsRequest {
  title: string
}

export async function checkTaskAlreadyExists({
  title,
}: CheckTaskAlreadyExistsRequest) {
  const task = await prisma.task.findUnique({
    where: { title },
  })

  const taskAlreadyExists = Boolean(task)

  if (taskAlreadyExists) {
    throw new DuplicatedTaskError()
  }
}
