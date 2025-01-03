import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => {
                return {
                    url: '/user/login',
                    method: 'POST',
                    body: userInfo,
                };
            },
        }),

        register: builder.mutation({
            query: (userInfo) => {
                return {
                    url: '/auth/signup',
                    method: 'POST',
                    body: userInfo,
                };
            },
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
