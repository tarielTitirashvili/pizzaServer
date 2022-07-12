import Router, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
const User = require('../models/user');

type ReqBody = {
  name: string;
  last_name: string;
  email: string;
  password: string;
  token: string;
};

const router = Router();

// api/auth
router.post('/register', async (req: Request<{}, {}, ReqBody>, res: Response) => {
  try {
    const { name, last_name: lastName, email, password, token } = req.body;
    if (!(name && lastName && email && password)) {
      res.status(400).send('all inputs are required!!!');
    }
    // check email in DB
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(400).send('user with this email already exist!');
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      last_name: lastName,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });
    const newToken = JWT.sign({ user_id: user._id, email }, process.env.tokenKey, {
      expiresIn: '2h',
    });

    user.token = token;

    console.log(newToken);
    res.status(201).json(user);
  } catch (e) {
    console.log(e);
  }
});
router.post('/login', (req: Request, res: Response) => {});

module.exports = router;
