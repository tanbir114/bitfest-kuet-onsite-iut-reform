/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
    role?: 'admin' | 'user';
    name: string;
    email: string;
    password: string;
};

export type TUserLogin = {
    email: string;
    password: string;
};

export type TJwtPayload = {
    email?: string;
    name?: string;
    role?: string;
    id?: Types.ObjectId;
};

export type TUserWithId = TUser & { _id: Types.ObjectId };

export interface IUser extends Model<TUser> {
    //instance methods for checking if the user exist
    isUserExistsByEmail(email: string): Promise<Partial<TUserWithId>>;
    //instance methods for checking if passwords are matched
    isPasswordMatched(
        plainTextPassword?: string,
        hashedPassword?: string,
    ): Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
