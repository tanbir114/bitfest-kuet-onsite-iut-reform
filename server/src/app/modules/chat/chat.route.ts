import express from 'express';
import { ChatController } from './chat.controller';

const router = express.Router();

router.post('/', ChatController.getChatReply);

export const ChatRoute = router;
