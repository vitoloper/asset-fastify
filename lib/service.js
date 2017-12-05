'use strict'

module.exports = async function (fastify, options) {
  

fastify.register(require('fastify-swagger'), {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0'
    },
    host: 'localhost',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],

  },exposeRoute: true
})

  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
  
  fastify.post('/asset', async (request, reply) => {
      
  });

  fastify.ready(err => {
  if (err) throw err
  console.log(fastify.swagger())
})
}
