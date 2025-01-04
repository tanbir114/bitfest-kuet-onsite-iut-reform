import { TStory } from '../../../types';
import { baseApi } from '../../api/baseApi';

type FinalStory = TStory & { generatedContent: string };
const storyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initialStory: builder.mutation({
            query: (story: TStory) => {
                return {
                    url: `/story/initial`,
                    method: 'POST',
                    body: story,
                };
            },
            invalidatesTags: ['story'],
        }),

        finalStory: builder.mutation({
            query: ({
                story,
                storyId,
            }: {
                story: FinalStory;
                storyId: string;
            }) => {
                return {
                    url: `/story/final/${storyId}`,
                    method: 'PUT',
                    body: story,
                };
            },

            invalidatesTags: ['story'],
        }),
    }),
});

export const { useInitialStoryMutation, useFinalStoryMutation } = storyApi;
