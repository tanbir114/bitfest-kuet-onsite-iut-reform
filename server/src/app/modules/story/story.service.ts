import { TStory } from './story.interface';
import { StoryModel } from './story.model';

const createInitialStoryIntoDB = async (story: TStory) => {
    const newStory = await StoryModel.create(story);

    console.log('[LOG : story.service] Create Initial Story: ', newStory);
    return newStory;
};

export const StoryService = {
    createInitialStoryIntoDB,
};
