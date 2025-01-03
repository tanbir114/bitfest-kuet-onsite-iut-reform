/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { TUserRole } from '../modules/user/user.interface';
import { UserModel } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            // Step 1 : Get token from header
            const tokenWithBearer = req.headers.authorization;

            // checking if the token is missing
            if (!tokenWithBearer) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You have no access to this route',
                );
            }

            // Step 2 : Extract token from header
            const token = tokenWithBearer.split(' ')[1];
            // checking if the given token is valid
            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;

            const { role, email, iat } = decoded;

            // Step 3 : Check if user exists
            const user = await UserModel.isUserExistsByEmail(email);

            if (!user) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'This user is not found !',
                );
            }

            // Step 4 : Check if role is valid
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You have no access to this route',
                );
            }

            req.user = decoded as JwtPayload;
            next();
        },
    );
};

export default auth;
