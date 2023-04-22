import express, { request } from 'express';
import bodyParser from 'body-parser';
import { randomUUID } from 'crypto'
import { routes } from './routes/index.js';

const app = express();
app.use(bodyParser.json());
app.use('/', routes)

const port = process.env.PORT || 3000;

app.listen(port, ()=> {
  console.log(`Rodando na http://localhost:${port}`);
})