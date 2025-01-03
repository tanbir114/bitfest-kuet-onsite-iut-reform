import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StoryService } from './story.service';

const createInitialStory = catchAsync(async (req, res) => {
    const story = req.body;
    const newStory = await StoryService.createInitialStoryIntoDB(story);

    console.log(
        '[LOG : story.controller > createInitialStory] Initial story created successfully',
        newStory,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Initial story created successfully',
        data: newStory,
    });
});

export const StoryController = {
    createInitialStory,
};
