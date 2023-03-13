const notes = require('express').Router();
const { readFromFile } = require('../../helpers/fsUtils.js');

notes.get('/', (req, res) =>
  readFromFile('C:/Users/ellie/code/note-taker2/db/db.json').then((data) => res.json(JSON.parse(data)))
);

module.exports = notes;