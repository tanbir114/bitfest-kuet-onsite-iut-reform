import httpStatus from 'http-status/lib';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ChatService } from './chat.service';

const getChatReply = catchAsync(async (req, res) => {
    const { message } = req.body;
    const reply = await ChatService.getChatReplyFromBot(message);

    console.log(
        '[LOG : chat.controller > getChatReply] Chat reply generated successfully',
        reply,
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Chat reply generated successfully',
        data: reply,
    });
});

export const ChatController = {
    getChatReply,
};
