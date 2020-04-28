const express = require('express');
const bodyParser =  require('body-parser');
const path = require('path');
const route = require('./routes/index');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

route.setupRoutes(app);

app.listen(PORT, 'localhost', () => {
    console.log('App is listening on port: ' + PORT);
});