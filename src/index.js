const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const route = require('./routes/index');
const middleware = require('./middleware/Auth');
const env = require('./helpers/AccessEnv');

const PORT = env.accessEnv('PORT');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors({origin : true}));
app.use('/api', middleware.checkAuthorize);
app.get('/demodocker', (req, res) => { res.send('Dizz me quang'); });

route.setupRoutes(app);

app.listen(PORT, () => { console.log('App is listening on port: ' + PORT); });
