import { NextFunction, Request, Response } from 'express';
import { IUser, ILoginBody, IReqBody } from '../interfaces/user';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import User from '../models/user';
import { Types } from 'mongoose';

const generateToken = (
  _id: Types.ObjectId,
  name: string,
  last_name: string,
  email: string,
  role: string,
): string => {
  return JWT.sign({ _id, name, last_name, email, role }, process.env.TOKEN_SECRET_KEY, {
    expiresIn: '4h',
  });
};

const validateToken = (req: Request, res: Response) => {
  const user: IUser = res.locals.jwt;
  console.log(user);
  res.json({ message: 'Token is validated', user });
};
const login = async (req: Request<{}, {}, ILoginBody>, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: 'all fields are required' });
    }
    const user: IUser | null = await User.findOne({ email });
    if (user !== null) {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass && email === user.email) {
        const { name, email: regEmail, last_name, _id, role } = user;
        const token = generateToken(_id, name, last_name, regEmail, role);
        return res.status(200).json({ user, token: token });
      }
    }
    res.status(400).json({ message: 'one of inputs is invalid' });
  } catch (e) {
    console.log(e);
  }
};
const registration = async (req: Request<{}, {}, IReqBody>, res: Response, next: NextFunction) => {
  try {
    const { name, last_name: lastName, email, password, role } = req.body;
    if (!(name && lastName && email && password)) {
      res.status(400).json({ message: 'all inputs are required!!!' });
    }
    // check email in DB
    const oldUser: IUser | null = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: 'user with this email already exist!' });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user: IUser | null = await User.create({
      name,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role: role,
    });
    const { _id, email: userEmail, role: userRole, name: userName, last_name } = user;

    const newToken = generateToken(_id, userName, last_name, userEmail, userRole);

    user.token = newToken;

    res.status(201).json(user);
  } catch (e) {
    res.json({ e });
  }
};

const allUsers = async (req: Request, res: Response) => {
  try {
    await User.find()
      .select('-password')
      .select('-role')
      .exec()
      .then((users) => {
        res.json({
          users,
          count: users.length,
        });
      });
  } catch (e) {
    res.json({
      message: "could't get users",
      e,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email;
    const deletedUser = await User.findOneAndDelete({ email });
    return res.json({ deletedUser });
  } catch (e) {
    res.json({
      message: 'delete was unsuccessful',
      e,
    });
  }
};
export default {
  validateToken,
  login,
  registration,
  allUsers,
  deleteUser,
};
