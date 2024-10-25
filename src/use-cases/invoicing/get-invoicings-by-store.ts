import { prisma } from '../../lib/prisma'

interface GetInvoicingsByStoreRequest {
  storeId: string
}

interface MonthlyInvoicing {
  [key: string]: number // meses e seus respectivos valores
}

interface YearlyInvoicing {
  [key: string]: MonthlyInvoicing // meses e seus respectivos valores
}

interface GetInvoicingsByStoreResponse {
  invoicings: YearlyInvoicing // anos e seus respectivos meses
}

export async function getInvoicingsByStore({
  storeId,
}: GetInvoicingsByStoreRequest): Promise<GetInvoicingsByStoreResponse> {
  const unformattedInvoicings: {
    year: number
    month: number
    value: number
  }[] = await prisma.$queryRaw`
    SELECT 
      EXTRACT(YEAR FROM "date") AS year,
      EXTRACT(MONTH FROM "date") AS month,
      "value"
    FROM "invoicings"
    WHERE "store_id" = ${storeId}
    ORDER BY year ASC, month ASC;
  `

  // Formatar os resultados no formato desejado
  const invoicings: YearlyInvoicing = {}

  unformattedInvoicings.forEach(
    (row: { year: number; month: number; value: number }) => {
      const year = row.year.toString()
      const monthName = new Date(0, row.month - 1)
        .toLocaleString('pt-BR', { month: 'long' })
        .toLowerCase() // Formata o mês

      if (!invoicings[year]) {
        invoicings[year] = {}
      }

      invoicings[year][monthName] = row.value // Adiciona o valor ao mês correspondente
    }
  )

  return { invoicings }
}
