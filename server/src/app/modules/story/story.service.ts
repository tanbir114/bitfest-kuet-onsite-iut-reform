import { banglishModel } from '../../utils/llmModels';
import { VectorDatabase } from '../../utils/vectorDatabase';
import {
    getTagsTemplate,
    getTemplate,
    getTitleTemplate,
} from './story.constant';
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

    // Content Generation
    const template = getTemplate();

    const banglishResponse = await banglishModel.invoke([
        template,
        newStory.originalContent,
    ]);

    console.log(
        '[LOG : story.service > createInitialStoryIntoDB] Google GenAI Response: ',
        banglishResponse.content,
    );

    // Title Generation
    const titleTemplate = getTitleTemplate();

    const titleResponse = await banglishModel.invoke([
        titleTemplate,
        newStory.originalContent,
    ]);

    // Tags Generation
    const tagTemplate = getTagsTemplate();

    const tagResponse = await banglishModel.invoke([
        tagTemplate,
        newStory.originalContent,
    ]);

    const tagsObject = JSON.parse(tagResponse.content.toString().trim());
    return {
        newStory,
        generatedContent: banglishResponse.content.toString().trim(),
        title: titleResponse.content,
        tags: tagsObject.tags,
    };
};

const createFinalStoryUpdateIntoDB = async (story: TStory, storyId: string) => {
    const updatedStory = await StoryModel.findByIdAndUpdate(storyId, story, {
        new: true,
    });

    const data = `Banglish Content: ${updatedStory?.originalContent} Bangla Content: ${updatedStory?.generatedContent}`;
    await VectorDatabase.loadDataIntoDB(data, 'banglish');
    await VectorDatabase.loadDataIntoDB(
        updatedStory?.generatedContent as string,
        'chatInfo',
    );

    console.log(
        '[LOG : story.service > createFinalStoryUpdateIntoDB] Update Final Story: ',
        updatedStory,
    );

    return updatedStory;
};

const createCollection = async (name: string) => {
    console.log('[Creating Collection]: ', 'story');
    const res = await VectorDatabase.createCollection(name);

    console.log('[Create Collection Response]: ', res);
};

const getAllStoriesFromDB = async () => {
    const stories = await StoryModel.find().populate('author');

    return stories;
};

export const StoryService = {
    createInitialStoryIntoDB,
    createFinalStoryUpdateIntoDB,
    createCollection,
    getAllStoriesFromDB,
};
