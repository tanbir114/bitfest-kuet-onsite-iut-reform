import httpStatus from 'http-status/lib';
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

// Get All User Controller
const getAllUser = catchAsync(async (req, res) => {
    const users = await UserService.getAllUserFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Users fetched successfully',
        data: users,
    });
});

const getUserById = catchAsync(async (req, res) => {
    const user = await UserService.getUserByIdFromDB(req.params.userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User fetched successfully',
        data: user,
    });
});
export const UserController = {
    createUser,
    loginUser,
    getAllUser,
    getUserById,
};
