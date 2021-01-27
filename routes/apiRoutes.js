let savedNotes = require("../db/db.json"); 
const fs = require("fs");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    return res.json(savedNotes);
  });
  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = savedNotes.length.toString();
    savedNotes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(savedNotes),(err) => {
      if(err) {
        console.log(err);
        res.sendStatus(404);
      } 
      else {
        console.log("Success!");
        res.sendStatus(200);
      }
    });
  });

  app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id;
    let noteID = (element) => element.id === id;
    let removeNote = savedNotes.findIndex(noteID);

    savedNotes.splice(removeNote, 1);

    fs.writeFile("./db/db.json", JSON.stringify(savedNotes), (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(404);
      } else {
        console.log("Note deleted");
        res.sendStatus(200);
      }
    });
  });
}
