'use strict'

module.exports = async function (fastify, options) {
  
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
  })
  
  fastify.post('/asset', async (request, reply) => {
      
  });
}
