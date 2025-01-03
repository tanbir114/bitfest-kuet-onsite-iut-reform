import jwt from 'jsonwebtoken';
import { TJwtPayload } from '../modules/user/user.interface';

export const createToken = (
    jwtPayload: TJwtPayload,
    secret: string,
    expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn,
    });
};
