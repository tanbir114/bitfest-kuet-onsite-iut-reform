import { ReactNode } from 'react';
import { TUser } from './user.types';

export type TResponse<T> = {
    data?: T;
    error?: TError;
    meta?: TMeta;
    success: boolean;
};

export type TError = {
    data: {
        message: string;
        stack: string;
        success: string;
    };
    status: number;
};
type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPages: number;
};

export type TRoute = {
    path: string;
    element: ReactNode;
};

export type TUserPaths = {
    name: string;
    path?: string;
    element?: ReactNode;
    children?: TUserPaths[];
};

export type TImprovement = {
    _id: string;
    originalContent: string;
    banglaContent: string;
    author: TUser;
    status?: 'pending' | 'approved' | 'rejected';
};

export type TStory = {
    title?: string;
    generatedContent?: string;
    originalContent: string;
    tags: string[];
    author: string;
    status?: string;
};
