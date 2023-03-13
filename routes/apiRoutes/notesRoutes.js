const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) =>
  readFromFile('C:/Users/ellie/code/note-taker2/db/db.json').then((data) => res.json(JSON.parse(data)))
);

notes.post('/', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
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