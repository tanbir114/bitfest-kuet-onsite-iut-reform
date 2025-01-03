import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';

// Create User Controller
const createUser = catchAsync(async (req, res) => {
    const newUser = await UserService.createUserIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User registered successfully',
        data: newUser,
    });
});

// Login User Controller
const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const { accessToken, refreshToken, loggedInUser } =
        await UserService.loginUserFromDB(email, password);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        data: { accessToken, refreshToken, loggedInUser },
    });
});

export const UserController = {
    createUser,
    loginUser,
};
