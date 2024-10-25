import { prisma } from '../../lib/prisma'

interface GetLossesByStoreRequest {
  storeId: string
}

interface MonthlyLoss {
  [key: string]: number // meses e seus respectivos valores
}

interface YearlyLoss {
  [key: string]: MonthlyLoss // meses e seus respectivos valores
}

interface GetLossesByStoreResponse {
  losses: YearlyLoss // anos e seus respectivos meses
}

export async function getLossesByStore({
  storeId,
}: GetLossesByStoreRequest): Promise<GetLossesByStoreResponse> {
  const unformattedLosses: {
    year: number
    month: number
    value: number
  }[] = await prisma.$queryRaw`
    SELECT 
      EXTRACT(YEAR FROM "date") AS year,
      EXTRACT(MONTH FROM "date") AS month,
      "value"
    FROM "losses"
    WHERE "store_id" = ${storeId}
    ORDER BY year ASC, month ASC;
  `

  // Formatar os resultados no formato desejado
  const losses: YearlyLoss = {}

  unformattedLosses.forEach(
    (row: { year: number; month: number; value: number }) => {
      const year = row.year.toString()
      const monthName = new Date(0, row.month - 1)
        .toLocaleString('pt-BR', { month: 'long' })
        .toLowerCase() // Formata o mês

      if (!losses[year]) {
        losses[year] = {}
      }

      losses[year][monthName] = row.value // Adiciona o valor ao mês correspondente
    }
  )

  return { losses }
}
