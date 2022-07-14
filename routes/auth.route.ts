import Router, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import verifyToken from '../middleware/auth.token.middleware';
import { IUser } from '../interfaces/user';
const User = require('../models/user');

interface LoginBody {
  email: string;
  password: string;
}

interface ReqBody extends LoginBody {
  name: string;
  last_name: string;
}

const router = Router();

// api/auth
router.post('/', verifyToken, (req: Request, res: Response) => {
  console.log(res.locals.jwt);
  const user: IUser = res.locals.jwt;
  return res.json({ message: 'Token is validated', user });
});
router.post('/register', async (req: Request<{}, {}, ReqBody>, res: Response) => {
  try {
    const { name, last_name: lastName, email, password } = req.body;
    if (!(name && lastName && email && password)) {
      res.status(400).send('all inputs are required!!!');
    }
    // check email in DB
    const oldUser: IUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send('user with this email already exist!');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user: IUser = await User.create({
      name,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const { _id, email: userEmail, role, name: userName, last_name } = user;
    const newToken = JWT.sign(
      { _id, email: userEmail, role, name: userName, last_name },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: '2h',
      },
    );

    user.token = newToken;

    res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
});
router.post('/login', async (req: Request<{}, {}, LoginBody>, res: Response) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send('all fields are required');
    }
    const user: IUser = await User.findOne({ email });
    if (user !== null) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass && email === user.email) {
        const { name, email: regEmail, last_name, _id, role } = user;
        const token = JWT.sign(
          { name, email: regEmail, last_name, _id, role },
          process.env.TOKEN_SECRET_KEY,
          {
            expiresIn: '2h',
          },
        );
        user.token = token;
        return res.status(200).send(user);
      }
    }
    res.status(400).send('one of inputs is invalid');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
