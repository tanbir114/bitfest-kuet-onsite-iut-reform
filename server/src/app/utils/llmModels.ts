import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
// import config from '../config';

export const chatModel = new ChatGoogleGenerativeAI({
    model: 'gemini-pro',
    maxOutputTokens: 2048,
});
export const banglishModel = new ChatGoogleGenerativeAI({
    model: 'gemini-pro',
    maxOutputTokens: 2048,
});
