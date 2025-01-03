import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../../config';
import { DataAPIClient } from '@datastax/astra-db-ts';
import { getChatTemplate } from './chat.constant';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

const genAI = new GoogleGenerativeAI(config.google_api_key as string);
export const embeddingModel = genAI.getGenerativeModel({
    model: 'text-embedding-004',
});

const client = new DataAPIClient(config.astra_db_application_token as string);
export const vectorDB = client.db(config.astra_db_api_endpoint as string, {
    namespace: config.astra_db_namespace as string,
});

const getChatReplyFromBot = async (message: string) => {
    console.log(
        '[LOG : chat.service > getChatReplyFromBot] Embedding message: ',
        message,
    );
    const embeddedMessage = await embeddingModel.embedContent(message);

    const collection = await vectorDB.collection('chatInfo');

    console.log(
        '[LOG : chat.service > getChatReplyFromBot] Embedded message: ',
        embeddedMessage,
    );

    console.log(
        '[LOG : chat.service > getChatReplyFromBot] Finding similar documents',
    );
    const cursor = await collection.find(
        {},
        {
            sort: {
                $vector: embeddedMessage.embedding.values,
            },
            limit: 10,
        },
    );

    const documents = await cursor.toArray();
    const docsMap = documents.map((doc) => doc.text);
    const docContext = JSON.stringify(docsMap);

    const template = getChatTemplate(docContext, message);

    console.log('[Querying Generative AI]...');
    const chatModel = new ChatGoogleGenerativeAI({
        model: 'gemini-pro',
        maxOutputTokens: 2048,
    });
    console.log('[Generating Response]...');

    const response = await chatModel.invoke([template, message]);

    console.log('[Response]: ', response.content);
    return response.content;
};

export const ChatService = {
    getChatReplyFromBot,
};
