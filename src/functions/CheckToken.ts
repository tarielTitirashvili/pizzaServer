import JWT, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../interfaces/user';

function CheckToken(reqToken: string): IUser | undefined {
  const token: string = reqToken.split(' ')[1];

  try {
    const user = JWT.verify(
      token,
      process.env.TOKEN_SECRET_KEY,
      (err, user): IUser | string | JwtPayload | undefined => {
        if (err) {
          throw new Error('Unauthorized');
        } else {
          if (user !== undefined) {
            return user;
          }
        }
      },
    );
    if (user !== undefined && typeof user !== 'string') {
      return user;
    }
  } catch (err) {
    throw new Error('Unauthorized');
  }
}
export default CheckToken;
