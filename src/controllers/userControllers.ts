import { NextFunction, Request, Response } from 'express';
import { IUser, LoginBody, ReqBody } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import User from '../models/user';

const validateToken = (req: Request, res: Response) => {
  const user: IUser = res.locals.jwt;
  res.json({ message: 'Token is validated', user });
};
const login = async (req: Request<{}, {}, LoginBody>, res: Response, next: NextFunction) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).send('all fields are required');
    }
    const user: IUser | null = await User.findOne({ email });
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
        console.log(user.token);
        return res.status(200).send(user);
      }
    }
    res.status(400).send('one of inputs is invalid');
  } catch (e) {
    console.log(e);
  }
};
const registration = async (req: Request<{}, {}, ReqBody>, res: Response, next: NextFunction) => {
  try {
    const { name, last_name: lastName, email, password } = req.body;
    if (!(name && lastName && email && password)) {
      res.status(400).send('all inputs are required!!!');
    }
    // check email in DB
    const oldUser: IUser | null = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send('user with this email already exist!');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user: IUser | null = await User.create({
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
};
export default {
  validateToken,
  login,
  registration,
};
