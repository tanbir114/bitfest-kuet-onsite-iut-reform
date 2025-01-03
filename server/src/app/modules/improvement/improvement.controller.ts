import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { ImprovementService } from './improvement.service';
import sendResponse from '../../utils/sendResponse';

const createImprovement = catchAsync(async (req, res) => {
    const improvement = await ImprovementService.createImrovementPostIntoDB(
        req.body,
    );

    console.log(
        '[LOG : improvement.controller > createImprovement] Improvement created successfully',
        improvement,
    );

    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'Improvement created successfully',
        data: improvement,
    });
});

const updatedImprovement = catchAsync(async (req, res) => {
    const { improvementId } = req.params;
    const improvement = await ImprovementService.updateImprovementPostIntoDB(
        req.body.status,
        improvementId,
    );

    console.log(
        '[LOG : improvement.controller > updatedImprovement] Improvement updated successfully',
        improvement,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Improvement updated successfully',
        data: improvement,
    });
});

const getAllImprovements = catchAsync(async (req, res) => {
    const improvements =
        await ImprovementService.getAllImprovementPostsFromDB();

    console.log(
        '[LOG : improvement.controller > getAllImprovements] Get all improvements successfully',
        improvements,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all improvements successfully',
        data: improvements,
    });
});

export const ImprovementController = {
    createImprovement,
    updatedImprovement,
    getAllImprovements,
};
