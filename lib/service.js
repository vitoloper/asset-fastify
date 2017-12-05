'use strict'

module.exports = async function (fastify, options) {
  

fastify.register(require('fastify-swagger'), {
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'testing the fastify swagger api',
      version: '0.1.0'
    },
    host: 'localhost:3000',

    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],

  },exposeRoute: true
})

  fastify.get('/', async (request, reply) => {
    // return await fastify.asset.insertAsset({name: 'microphone', status: 'operational'})
    return { hello: 'world' }
  })
  
  fastify.get('/asset/:id',{
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'user id'
        }
      }
    }
  }
}
, async (request, reply) => {
    // console.log(request)
    console.log(request.params)
    var id = parseInt(request.params.id)
    
    var result = await fastify.asset.queryAsset({where: {id: id}, raw: true})
    
    if (result.length === 0)
      return {}
    
    return result[0]
  });
  
  fastify.post('/asset', {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        status: {type: 'string'}
        
      }
      
    }
  }
},async (request, reply) => {
      // console.log(request);
      console.log(request.body.name);
      console.log(request.body.status);
      return await fastify.asset.insertAsset({name: request.body.name, status: request.body.status})
  });

  fastify.ready(err => {
  if (err) throw err
  console.log(fastify.swagger())
})
}
