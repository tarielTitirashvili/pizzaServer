import { Request, Response, NextFunction } from 'express';
import checkToken from '../functions/CheckToken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const reqToken: string = req.body.token || req.query.token || req.headers['authentication'];
  if (!reqToken) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const user = checkToken(reqToken);
    res.locals.jwt = user;
  } catch (e) {
    res.status(401).json({ e });
  }
  return next();
};
export default verifyToken;
