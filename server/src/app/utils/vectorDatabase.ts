import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config';
import { DataAPIClient } from '@datastax/astra-db-ts';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export type SimilarityMetric = 'cosine' | 'euclidean' | 'dot_product';

const genAI = new GoogleGenerativeAI(config.google_api_key as string);
export const embeddingModel = genAI.getGenerativeModel({
    model: 'text-embedding-004',
});

const client = new DataAPIClient(config.astra_db_application_token as string);
export const vectorDB = client.db(config.astra_db_api_endpoint as string, {
    namespace: config.astra_db_namespace as string,
});

export const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 128,
});

const createCollection = async (
    similarityMetric: SimilarityMetric = 'dot_product',
) => {
    console.log('[Creating Collection]: ', config.astra_db_collection);
    // await vectorDB.dropCollection(config.astra_db_collection as string);
    const res = await vectorDB.createCollection(
        config.astra_db_collection as string,
        {
            vector: {
                dimension: 768,
                metric: similarityMetric,
            },
        },
    );

    console.log('[Create Collection Response]: ', res);
};

const loadDataIntoDB = async (content: string) => {
    const collection = await vectorDB.collection(
        config.astra_db_collection as string,
    );

    const chunks = await splitter.splitText(content);

    for await (const chunk of chunks) {
        const result = await embeddingModel.embedContent(chunk);
        console.log('[Embedding Result]: ', result);
        const vector = result.embedding.values;
        console.log('[Vector]: ', vector);

        const res = await collection.insertOne({
            $vector: vector,
            text: chunk,
        });

        console.log('[Insert Result for Chunk]: ', res);
    }
};

export const VectorDatabase = {
    createCollection,
    loadDataIntoDB,
};
