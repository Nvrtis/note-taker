const http = require('http')
const fs = require('fs')
const PORT = 8080

const handleRequest = (request, response) => {
  response.writeHead(200, { "Content-Type": 'text/html' })
  
}

const server = http.createServer(handleRequest)
server.listen(PORT, () => {
  console.log('Server listening on http://localhost:' + PORT)
})