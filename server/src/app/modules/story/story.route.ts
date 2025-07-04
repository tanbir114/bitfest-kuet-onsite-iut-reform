import express from 'express';
import { StoryController } from './story.controller';

const router = express.Router();

router.post('/initial', StoryController.createInitialStory);
router.put('/final/:storyId', StoryController.createFinalStoryUpdate);
router.get('/createCollection/:name', StoryController.createCollection);
router.get('/', StoryController.getAllStories);
router.get('/:authorId', StoryController.getStoriesByAuthor);

export const StoryRoute = router;
