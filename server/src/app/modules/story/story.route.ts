import express from 'express';
import { StoryController } from './story.controller';

const router = express.Router();

router.post('/initial', StoryController.createInitialStory);
router.put('/final/:storyId', StoryController.createFinalStoryUpdate);

export const StoryRoute = router;
