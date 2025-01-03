import { Schema, model } from 'mongoose';
import { TStory } from './story.interface';

const StorySchema = new Schema<TStory>(
    {
        title: { type: String },
        generatedContent: { type: String },
        originalContent: { type: String, required: true },
        tags: { type: [String], required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        status: {
            type: String,
            enum: ['public', 'private'],
            default: 'public',
        },
    },
    {
        timestamps: true,
    },
);

export const StoryModel = model('Story', StorySchema);
