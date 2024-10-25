import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { userRoutes } from './controllers/user'
import fastifyJwt from '@fastify/jwt'
import { env } from '../env'
import { taskRoutes } from './controllers/task'
import { completionRoutes } from './controllers/completion'
import { invoicingRoutes } from './controllers/invoicing'
import { lossRoutes } from './controllers/loss'
import { storeRoutes } from './controllers/store'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })

app.register(userRoutes)
app.register(taskRoutes)
app.register(completionRoutes)
app.register(invoicingRoutes)
app.register(lossRoutes)
app.register(storeRoutes)
