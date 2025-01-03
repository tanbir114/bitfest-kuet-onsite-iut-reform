import { banglishModel } from '../../utils/llmModels';
import { getTemplate } from './story.constant';
import { TStory } from './story.interface';
import { StoryModel } from './story.model';

const createInitialStoryIntoDB = async (story: TStory) => {
    const newStory = await StoryModel.create(story);

    console.log(
        '[LOG : story.service > createInitialStoryIntoDB] Create Initial Story: ',
        newStory,
    );

    console.log(
        '[LOG : story.service > createInitialStoryIntoDB] Generating Reponse from Google GenAI: ',
    );

    const template = getTemplate();

    const banglishResponse = await banglishModel.invoke([
        template,
        newStory.originalContent,
    ]);

    console.log(
        '[LOG : story.service > createInitialStoryIntoDB] Google GenAI Response: ',
        banglishResponse.content,
    );

    return { newStory, generatedContent: banglishResponse.content };
};

export const StoryService = {
    createInitialStoryIntoDB,
};
