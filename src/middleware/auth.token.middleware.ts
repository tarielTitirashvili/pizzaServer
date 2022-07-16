import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const ReqToken: string = req.body.token || req.query.token || req.headers['authentication'];
  if (!ReqToken) {
    return res.status(403).send('A token is required for authentication');
  }
  const token: string = ReqToken.split(' ')[1];

  try {
    JWT.verify(token, process.env.TOKEN_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Unauthorized' });
      } else {
        if (user !== undefined) {
          res.locals.jwt = user;
          next();
        }
      }
    });
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  return next();
};
export default verifyToken;
