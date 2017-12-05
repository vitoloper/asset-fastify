'use strict'

var Asset = require('@vitoloper/matteo-asset-service')

async function db (fastify, options) {
  // const url = options.url
  
  const database = options.database
  const username = options.username
  const password = options.password
  const host = options.host
  const path = options.path
  
  // delete options.url

  // const db = await MongoClient.connect(url, options)
  const db = await Asset(database, username, password, host, path)
  
  fastify.decorate('asset', db)
}

module.exports = db
