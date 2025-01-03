import express from 'express';
import { StoryController } from './story.controller';

const router = express.Router();

router.post('/initial', StoryController.createInitialStory);
router.put('/final/:storyId', StoryController.createFinalStoryUpdate);
router.get('/createCollection', StoryController.createCollection);

export const StoryRoute = router;
