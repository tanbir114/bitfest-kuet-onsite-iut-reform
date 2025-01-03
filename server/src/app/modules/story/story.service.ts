import { banglishModel } from '../../utils/llmModels';
import { VectorDatabase } from '../../utils/vectorDatabase';
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

const createFinalStoryUpdateIntoDB = async (story: TStory, storyId: string) => {
    const updatedStory = await StoryModel.findByIdAndUpdate(storyId, story, {
        new: true,
    });

    const data = `Banglish Content: ${updatedStory?.originalContent} Bangla Content: ${updatedStory?.generatedContent}`;
    await VectorDatabase.loadDataIntoDB(data);

    console.log(
        '[LOG : story.service > createFinalStoryUpdateIntoDB] Update Final Story: ',
        updatedStory,
    );

    return updatedStory;
};

const createCollection = async () => {
    console.log('[Creating Collection]: ', 'story');
    const res = await VectorDatabase.createCollection();

    console.log('[Create Collection Response]: ', res);
};

export const StoryService = {
    createInitialStoryIntoDB,
    createFinalStoryUpdateIntoDB,
    createCollection,
};
