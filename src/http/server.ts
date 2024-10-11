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
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })

app.register(userRoutes)
app.register(taskRoutes)
