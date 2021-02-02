const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const path = require('path')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


// * HTML ROUTES
app.get('*', (req, res) => {
  res.sendFile( path.join(__dirname + '/public/index.html'))
})

app.get('/notes', (req, res) => {
  res.sendFile( path.join(__dirname + '/public/notes.html'))
})

//  * API ROUTES
app.get('/api/notes', (req, res) => {
  res.json(__dirname + `/db/db.json`)
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})



// // add new characters
// app.post('/api/notes/add', (req, res) => {
//   const newCharacter = req.body
//   newCharacter.routeName = newCharacter.name.replace(/ /g, '').toLowerCase()
//   characters.push(newCharacter)
//   res.status(200).send()
// })
