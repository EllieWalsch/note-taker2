const express = require('express');
const path = require('path');
const htmlRoutes = require('./routes/htmlRoutes/index.js');
const apiRoutes = require('./routes/apiRoutes/index.js')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);