const express = require('express');
const noteRouter = require('./notesRoutes')

const app = express();

app.use('/notes', noteRouter)

module.exports = app;