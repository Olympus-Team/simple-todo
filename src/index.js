const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/index');
const middleware = require('./middleware/Auth');
const dotenv = require('dotenv'); 
const cors = require('cors');

dotenv.config();
// eslint-disable-next-line no-undef
const PORT = process.env.MYSQL_OS_PORT || 3000;
//console.log('Duc: ' + JSON.stringify(process.env));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: true}));
app.use('/api', middleware.checkAuthorize);
route.setupRoutes(app);
app.listen(PORT, () => {
  console.log('App is listening on port: ' + PORT);
  // eslint-disable-next-line no-undef
  console.log(process.env.MYSQL_DATABASE_NAME);
});
