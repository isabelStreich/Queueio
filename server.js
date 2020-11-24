'use strict'
const express = require('express')
const socketIO = require('socket.io')
const http = require('http')
const bodyParser = require('body-parser')
const { response } = require('express')

const app = express()

const PORT = 3000
const HTTP_OK = 200
const CONTENT_TYPE_JSON = 'application/json'
const CONTENT_TYPE_HTML = 'text/html'

app.get('/commerce', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_HTML })
    response.end('<h1>soy get</h1>')
})
app.post('/post', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_HTML })
    response.end('<h1>soy post</h1>')
})
app.put('/put', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_HTML })
    response.end('<h1>soy put</h1>')
})
app.delete('/delete', function (request, response) {
    response.writeHead(HTTP_OK, { 'Content-type': CONTENT_TYPE_HTML })
    response.end('<h1>soy delete</h1>')
})

app.listen(PORT, function () {
    console.log('server listening on http://localhost:%s', PORT)
})
