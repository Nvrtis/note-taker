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

// Posting Notes
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  let uniqueId = (noteList.length).toString();
  newNote.id = uniqueId;
  noteList.push(newNote);
  
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList), err => {
      if (err) throw (err);        
  }); 
  res.json(noteList);    

});

// Deleting Notes
app.delete("/api/notes/:id", (req, res) => {

  let noteId = req.params.id;
  let newId = 0;
  console.log(`Deleting note with id ${noteId}`);
  noteList = noteList.filter(currentNote => {
     return currentNote.id != noteId;
  });
  for (currentNote of noteList) {
      currentNote.id = newId.toString();
      newId++;
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
  res.json(noteList);
}); 



app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
