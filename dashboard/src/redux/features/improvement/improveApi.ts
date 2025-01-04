import { TImprovement } from '../../../types';
import { baseApi } from '../../api/baseApi';

const improveApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getImprove: builder.query({
            query: () => {
                return {
                    url: '/improvement/getAll',
                    method: 'GET',
                };
            },
            providesTags: ['improve'],
        }),

        updateImprove: builder.mutation({
            query: ({ id, status }: { id: string; status: string }) => {
                return {
                    url: `/improvement/${id}`,
                    method: 'PUT',
                    body: { status },
                };
            },
            invalidatesTags: ['improve'],
        }),

        getStoryByAuthor: builder.query({
            query: (author: string) => {
                return {
                    url: `/story/${author}`,
                    method: 'GET',
                };
            },
            providesTags: ['story'],
        }),

        getImproveByAuthor: builder.query({
            query: (author: string) => {
                console.log(author);
                return {
                    url: `/improvement/getByAuthor/${author}`,
                    method: 'GET',
                };
            },
            providesTags: ['improve'],
        }),
    }),
});

export const {
    useGetImproveQuery,
    useUpdateImproveMutation,
    useGetStoryByAuthorQuery,
    useGetImproveByAuthorQuery,
} = improveApi;
