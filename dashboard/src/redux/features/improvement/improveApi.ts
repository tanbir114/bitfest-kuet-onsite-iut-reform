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
    }),
});

export const { useGetImproveQuery, useUpdateImproveMutation } = improveApi;
