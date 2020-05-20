import express  from 'express';
import bodyParser from 'body-parser';
import cors from'cors';
import setupRoutes from'./routes/index';
import checkAuthorize from'./middleware/Auth';
import accessEnv from'./helpers/AccessEnv';

const PORT = accessEnv('PORT');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({origin: true}));
app.use('/api', checkAuthorize);
app.get('/demoapi', (req, res) =>{
  res.send('Hello world from Omlympus team');
});

setupRoutes(app);

app.listen(PORT, () => {
  console.log('App is listening on port: ' + PORT);
});
