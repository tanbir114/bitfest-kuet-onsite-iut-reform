import { Types } from 'mongoose';

export type TStory = {
    title?: string;
    generatedContent?: string;
    originalContent: string;
    tags: string[];
    author: Types.ObjectId;
};
