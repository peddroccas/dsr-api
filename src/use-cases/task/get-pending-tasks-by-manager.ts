import type { Task } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import dayjs from 'dayjs'
import { getTasks } from './get-tasks'

interface GetPendingTasksByManagerRequest {
  managerId: string
}

interface GetPendingTasksByManagerResponse {
  tasks: Task[]
}

export async function getPendingTasksByManager({
  managerId,
}: GetPendingTasksByManagerRequest) {
  const { tasks } = await getTasks()

  const startOfWeek = dayjs().startOf('week').toDate()
  const endOfWeek = dayjs().endOf('week').toDate()

  const completions = await prisma.completion
    .groupBy({
      by: ['taskId'],
      _count: true,
      where: {
        managerId: managerId,
        completed_at: { gte: startOfWeek, lte: endOfWeek },
      },
    })
    .then(completions =>
      completions.map(completion => {
        return {
          taskId: completion.taskId,
          completionCount: completion._count,
        }
      })
    )

  const pendingTasks: Task[] = []

  for (const task of tasks) {
    const isTaskCompleted = completions.some(
      completion =>
        completion.taskId === task.id &&
        completion.completionCount === task.weekly_frequency
    )
    if (!isTaskCompleted) {
      pendingTasks.push(task)
    }
  }

  const remainingTasks = []

  for (const pendingTask of pendingTasks) {
    const task = completions.find(
      completion => completion.taskId === pendingTask.id
    )

    const remaining = () =>
      task
        ? pendingTask.weekly_frequency - task.completionCount
        : pendingTask.weekly_frequency

    remainingTasks.push({
      ...pendingTask,
      remaining: remaining(),
    })
  }

  return { remainingTasks }
}
