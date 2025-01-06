/* eslint-disable @typescript-eslint/no-explicit-any */
import { banglishModel } from '../../utils/llmModels';
import { StoryModel } from '../story/story.model';
import { UserModel } from '../user/user.model';
import { getSearchPromptTemplate } from './search.constant';
import { TSearchResponse } from './search.interface';

const searchServiceFromDB = async (query: string) => {
    // invoke model to convert pure bangla.
    const searchTemplate = getSearchPromptTemplate();

    const searchResponse = await banglishModel.invoke([searchTemplate, query]);

    const searchResultObject: TSearchResponse = JSON.parse(
        searchResponse.content.toString().trim(),
    );

    // clean query and remove all unnecessary characters and white space but keep all bangla text
    searchResultObject.originalInput = query.trim();

    console.log('[LOG] searchResultObject: ', searchResultObject);
    // Search from author's database based on name matches with query
    const authors = await UserModel.find({
        name: {
            $regex: searchResultObject.keywords.join('|'),
            $options: 'i',
        },
    });

    console.log('[LOG] authors: ', authors);

    // Search from story's database based on title matches with searchResultObject.bangla, generatedContent with searchResultObject.bangla, and searchResultObject.keywords includes in tags, also search from authors
    /*
        Example of a story:
        {
                    "banglish": "Ami valo achi.",
                    "bangla": "আমি ভালো আছি।",
                    "keywords": ["ami", "bhalo", "achi"]
                }
    */
    const authorStories = await StoryModel.find().populate({
        path: 'author', // Populate the author field
        match: {
            name: {
                $in: searchResultObject.keywords,
            },
        }, // Match author's name
        select: 'name', // Optional: fetch only the name
    });

    // console.log('[LOG] authorStories: ', authorStories);
    // Filter to include only stories where the author matches
    const filteredAuthorStories = authorStories.filter(
        (story: any) => story?.author !== null,
    );

    const matchingStories = await StoryModel.find({
        $or: [
            {
                title: {
                    $regex: searchResultObject.bangla,
                    $options: 'i',
                },
            },
            {
                generatedContent: {
                    $regex: searchResultObject.bangla,
                    $options: 'i',
                },
            },
            {
                originalContent: {
                    $regex: searchResultObject.banglish,
                    $options: 'i',
                },
            },
            { originalContent: { $in: searchResultObject.keywords } },
        ],
    });

    console.log('[LOG] matchingStories: ', matchingStories);

    // Combine both results, ensuring no duplicates
    const stories = [
        ...filteredAuthorStories,
        ...matchingStories.filter(
            (story: any) =>
                !filteredAuthorStories.some(
                    (s: any) => s._id.toString() === story._id.toString(),
                ),
        ),
    ];

    return {
        authors,
        stories,
    };
};

export const SearchService = {
    searchServiceFromDB,
};
