'use strict'

module.exports = async function (fastify, options) {
  
  fastify.get('/', async (request, reply) => {
    // return await fastify.asset.insertAsset({name: 'microphone', status: 'operational'})
    return { hello: 'world' }
  })
  
  fastify.get('/asset/:id', async (request, reply) => {
    // console.log(request)
    console.log(request.params)
    var id = parseInt(request.params.id)
    
    var result = await fastify.asset.queryAsset({where: {id: id}, raw: true})
    
    if (result.length === 0)
      return {}
    
    return result[0]
  });
  
  fastify.post('/asset', async (request, reply) => {
      // console.log(request);
      console.log(request.body.name);
      console.log(request.body.status);
      return await fastify.asset.insertAsset({name: request.body.name, status: request.body.status})
  });
}
