import { Request, Response, NextFunction } from 'express';
import checkToken from '../functions/CheckToken';
import { IUser } from '../interfaces/user';

const checkRoleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const reqToken: string = req.body.token || req.query.token || req.headers['authentication'];
  if (!reqToken) {
    return res.status(403).json({ message: 'authentication is required to get all users' });
  }
  try {
    const user: IUser | undefined = checkToken(reqToken);
    if (user) {
      if (user.role === 'ADMIN') {
        res.locals.jwt = user;
      } else {
        return res.json({ message: 'Access is restricted' });
      }
    }
  } catch (e) {
    return res.status(401).json({ e });
  }
  return next();
};

export default checkRoleMiddleware;
