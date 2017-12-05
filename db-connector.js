'use strict'

var Asset = require('@vitoloper/matteo-asset-service')
var fp = require('fastify-plugin')

async function db (fastify, options) {
  
  const database = options.database
  const username = options.username
  const password = options.password
  const host = options.host
  const path = options.path
  
  const db = await Asset(database, username, password, host, path)
  
  fastify.decorate('asset', db)
}

module.exports = fp(db)
