import {
    BaseQueryApi,
    BaseQueryFn,
    createApi,
    DefinitionType,
    FetchArgs,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { TUser } from '../../types';
import { toast } from 'sonner';
import { TResponse } from '../../types/global.types';
import { setUser } from '../features/auth/authSlice';

// Defining baseQuery
const baseQuery = fetchBaseQuery({
    baseUrl: `http://localhost:5001/api`,
    credentials: 'include',

    //  Attaching the token to the headers
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('Authorization', `bearer ${token}`);
        }

        return headers;
    },
});

// Defining baseQueryWithRefreshToken
const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    // Calling baseQuery with the provided arguments and extraOptions
    let result = (await baseQuery(args, api, extraOptions)) as TResponse<TUser>;

    if (result?.error?.status === 404) {
        toast.error(result.error?.data?.message, { duration: 2000 });
    }

    // If the status is 401, then we need to refresh the token
    if (result?.error?.status === 401) {
        const res = await fetch(
            `http://localhost:5001/api/auth/refresh-token`,
            {
                method: 'POST',
                credentials: 'include',
            },
        );

        // Getting the data from the response
        const data = await res.json();

        // Getting the user from the state
        const user = (api.getState() as RootState).auth.user;

        // Dispatching the setUser action with the new token
        api.dispatch(
            setUser({
                user,
                token: data.data.accessToken,
            }),
        );
        result = (await baseQuery(args, api, extraOptions)) as TResponse<TUser>;
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['improve'],
    endpoints: () => ({}),
});
