import { prisma } from '../../lib/prisma'

interface GetTasksResponse {
  tasks: { id: string; title: string; weeklyFrequency: number }[]
}

export async function getTasks(): Promise<GetTasksResponse> {
  const tasks = await prisma.task.findMany().then(tasks =>
    tasks.map(task => {
      return {
        id: task.id,
        title: task.title,
        weeklyFrequency: task.weekly_frequency,
      }
    })
  )

  return { tasks }
}
