import httpStatus from 'http-status/lib';
import AppError from '../../utils/appError';
import { TJwtPayload, TUser, TUserWithId } from './user.interface';
import { UserModel } from './user.model';
import { createToken } from '../../utils/createToken';
import config from '../../config';

// Create User Into Database
const createUserIntoDB = async (user: TUser) => {
    const newUser = await UserModel.create(user);
    console.log(
        '[LOG : UserService > createUserIntoDB] New User Created : ',
        newUser,
    );
    return newUser;
};

const loginUserFromDB = async (email: string, password: string) => {
    // Step 1 : Check if user exists
    const user: Partial<TUserWithId> =
        await UserModel.isUserExistsByEmail(email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // Step 2 : Check if password is correct
    if (!(await UserModel.isPasswordMatched(password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    // Step 3 : Create JWT Token
    const jwtPayload: TJwtPayload = {
        email: user.email,
        role: user.role,
        name: user.name,
        id: user?._id,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    // Step 4 : Get user without password
    const loggedInUser = await UserModel.findOne({
        email,
    }).select('-password');

    console.log(
        '[LOG : UserService > loginUserFromDB] Logged In User : ',
        loggedInUser,
    );

    return { accessToken, refreshToken, loggedInUser };
};

const getAllUserFromDB = async () => {
    const users = await UserModel.find().select('-password');
    return users;
};

const getUserByIdFromDB = async (userId: string) => {
    const user = await UserModel.findById(userId).select('-password');
    return user;
};

export const UserService = {
    createUserIntoDB,
    loginUserFromDB,
    getAllUserFromDB,
    getUserByIdFromDB,
};
