import express, { Express, Request, Response } from 'express';
const mongoose = require('mongoose');
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const port = process.env.PORT;
const mongoURI = process.env.mongoURI;

app.use('api/auth', require('../routes/auth.route'));

async function start() {
  try {
    await mongoose.connect(mongoURI);
    app.listen(port, () => {
      console.log(`app is running on http://localhost:${port}/`);
      process.exit(1);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

let counter: number = 0;

app.get('/', (req: Request, res: Response) => {
  counter++;
  res.send(`Express + TypeScript Server ${counter}`);
});
