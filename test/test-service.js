'use strict'

var Asset = require('@vitoloper/matteo-asset-service')

const Fastify = require('fastify')
const {
  beforeEach,
  afterEach,
  test
} = require('tap')
const service = require('../')

var app
beforeEach((done) => {
  app = Fastify()
  app.register(require('../db-connector'), {
    database: 'assetdb',
    username: 'asset',
    password: 'asset',
    host: 'localhost',
    path: 'data/mydb.sqlite'
  })
  app.register(service)
  app.ready(done)
})

afterEach((done) => {
  app.close(done)
})

test('GET /asset', async function (t) {
  // TODO: questo dovrebbe essere fatto una sola all'inizio del file, non qui all'interno del subtest
  var assetService = await Asset('assetdb', 'asset', 'asset', 'localhost', 'data/mydb.sqlite')
  var result = await assetService.insertAsset({name: 'chair', status: 'wait'})
  const response = await app.inject({
    method: 'GET',
    url: '/asset/1'
  })
  
  var payload = JSON.parse(response.payload)
  
  t.equal(payload.name, 'chair')
})

test('POST /asset', async function (t) {
  const response = await app.inject({
    method: 'POST',
    url: '/asset',
    payload: {name: 'mic', status: 'wait'},
    headers: {'Content-Type': 'application/json'}
  })
  
  var payload = JSON.parse(response.payload)
  
  t.equal(payload.name, 'mic')
  t.equal(payload.status, 'wait')
});
