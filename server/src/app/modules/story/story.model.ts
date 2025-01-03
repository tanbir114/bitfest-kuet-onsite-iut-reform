import { Schema, model } from 'mongoose';
import { TStory } from './story.interface';

const StorySchema = new Schema<TStory>(
    {
        title: { type: String, required: true },
        generatedContent: { type: String },
        originalContent: { type: String, required: true },
        tags: { type: [String], required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {
        timestamps: true,
    },
);

export const StoryModel = model('Story', StorySchema);
