const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const path = require('path')

let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// * HTML ROUTES
app.get('/', (req, res) => {
  res.sendFile( path.join(__dirname + '/public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile( path.join(__dirname + '/public/notes.html'))
})

//  * API ROUTES
app.get('/api/notes', (req, res) => {
  res.json(noteList)
})


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
