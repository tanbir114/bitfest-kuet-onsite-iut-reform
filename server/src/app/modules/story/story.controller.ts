import httpStatus from 'http-status/lib';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StoryService } from './story.service';

const createInitialStory = catchAsync(async (req, res) => {
    const header = req.headers;
    console.log(
        '[LOG : story.controller > createInitialStory] Header: ',
        header,
    );
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

const createFinalStoryUpdate = catchAsync(async (req, res) => {
    const { storyId } = req.params;
    const story = req.body;
    const updatedStory = await StoryService.createFinalStoryUpdateIntoDB(
        story,
        storyId,
    );

    console.log(
        '[LOG : story.controller > createFinalStoryUpdate] Final story updated successfully',
        updatedStory,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Final story updated successfully',
        data: updatedStory,
    });
});

const createCollection = catchAsync(async (req, res) => {
    const { name } = req.params;
    await StoryService.createCollection(name);

    console.log(
        '[LOG : story.controller > createCollection] Collection created successfully',
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Collection created successfully',
        data: null,
    });
});

const getAllStories = catchAsync(async (req, res) => {
    const header = req.headers;
    console.log('[LOG : story.controller > getAllStories] Header: ', header);
    const stories = await StoryService.getAllStoriesFromDB();

    console.log(
        '[LOG : story.controller > getAllStories] All stories fetched successfully',
        stories,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All stories fetched successfully',
        data: stories,
    });
});

const getStoriesByAuthor = catchAsync(async (req, res) => {
    const { authorId } = req.params;
    const stories = await StoryService.getStoriesByAuthor(authorId);

    console.log(
        '[LOG : story.controller > getStoriesByAuthor] Stories fetched successfully',
        stories,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Stories fetched successfully',
        data: stories,
    });
});
export const StoryController = {
    createInitialStory,
    createFinalStoryUpdate,
    createCollection,
    getAllStories,
    getStoriesByAuthor,
};
