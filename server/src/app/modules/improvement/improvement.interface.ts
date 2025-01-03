import { Types } from 'mongoose';

export type TImprovement = {
    originalContent: string;
    banglaContent: string;
    author: Types.ObjectId;
    status?: 'pending' | 'approved' | 'rejected';
};
