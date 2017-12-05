'use strict'

const Fastify = require('fastify')
const minimist = require('minimist')
const service = require('./lib/service')

function start (opts) {
  opts = opts || {}

  const app = Fastify(opts)
  
  app.register(require('./db-connector'), {
    database: 'assetdb',
    username: 'asset',
    password: 'asset',
    host: 'localhost',
    path: 'data/mydb.sqlite'
  })
  
  app.register(service, opts)
  app.listen(opts.port, (err) => {
    if (err) {
      throw err
    }
    
    console.log( `Server listening on port ${app.server.address().port}`)
  })
}

module.exports = service

if (require.main === module) {
  start(minimist(process.argv.slice(2), {
    integer: 'port',
    alias: {
      'port': 'p',
    },
    default: {
      port: 3000
    }
  }))
}
