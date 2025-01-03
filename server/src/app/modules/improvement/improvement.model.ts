import { Schema, model } from 'mongoose';
import { TImprovement } from './improvement.interface';

const ImprovementSchema = new Schema<TImprovement>(
    {
        originalContent: {
            type: String,
            required: true,
        },
        banglaContent: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    },
);

export const ImprovementModel = model('Improvement', ImprovementSchema);
