const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) =>
  readFromFile('C:/Users/ellie/code/note-taker2/db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('C:/Users/ellie/code/note-taker2/db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('C:/Users/ellie/code/note-taker2/db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
  
        writeToFile('C:/Users/ellie/code/note-taker2/db/db.json', result);
  
        res.json(`Item ${noteId} has been deleted`);
      });
});

notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, 'C:/Users/ellie/code/note-taker2/db/db.json');
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      res.json(response);
    } else {
      res.json('Error in adding note');
    }
});

module.exports = notes;