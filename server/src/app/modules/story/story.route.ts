import express from 'express';
import { StoryController } from './story.controller';

const router = express.Router();

router.post('/initial', StoryController.createInitialStory);

export const StoryRoute = router;
