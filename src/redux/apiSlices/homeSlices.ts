import { api } from "../api/baseApi";

export const homeSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        getNewsFeet: builder.query({
            query: ({id,page,limit}) => ({
                url: `/chat/news-feed`,
            }),
            providesTags : ["news_feed"]
        }),

    }),
})


export const { useGetNewsFeetQuery } = homeSlices;