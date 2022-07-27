import express from 'express';
import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      TOKEN_SECRET_KEY: string;
      REFRESH_TOKEN_SECRET: string;
    }
  }
}

const app = express();

const port: string = process.env.PORT;

const mongoURI: string = process.env.MONGO_URI;
app.use(express.json());
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/product', require('./routes/products.route'));
app.use('/api/category', require('./routes/categories.route'));

async function start() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    app.listen(5000, () => {
      console.log(`app is running on http://localhost:${port}/`);
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

start();
