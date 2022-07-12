import express, { Express, Request, Response } from 'express';
const mongoose = require('mongoose');
import dotenv from 'dotenv';
dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      mongoURI: string;
      tokenKey: string;
    }
  }
}

const app = express();

const port: string = process.env.PORT;
const mongoURI: string = process.env.mongoURI;
let counter: number = 0;
app.get('/', (req: Request, res: Response) => {
  counter++;
  res.send(`Express + TypeScript Server ${counter}`);
});
app.use(express.json());
app.use('/api/auth', require('../routes/auth.route'));

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`app is running on http://localhost:${port}/`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();
