const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const route = require('./routes/index');
const taskRoute = require('./routes/task-route');
const tasks = require('./database/connection');
const middleware = require('./middleware/Auth');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/api', middleware.checkAuthorize);

route.setupRoutes(app);
taskRoute.setupRoutes(app);

app.listen(PORT, () => { console.log('App is listening on port: ' + PORT); });