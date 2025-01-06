import httpStatus from 'http-status/lib';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SearchService } from './search.service';

const search = catchAsync(async (req, res) => {
    const { query } = req.body;
    const searchResult = await SearchService.searchServiceFromDB(query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Search result fetched successfully',
        data: searchResult,
    });
});

export const SearchController = {
    search,
};
