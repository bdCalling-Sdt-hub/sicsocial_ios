import { api } from "../api/baseApi";

export const chatSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        getChatList: builder.query({
            query: ({id,page,limit}) => ({
                url: `/chat/chat-list`,
              
            }),
            providesTags : ["chat"]
        }),
        getMessage: builder.query({
            query: ({id,page,limit}) => ({
                url: `/message/chatId/${id}`,
            }),
            providesTags : ["chat"]
        }),

        createMessage: builder.mutation({
            query: (data) => ({
                url: `/message/send-message`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["message","news_feed"]
          }),
        createChat: builder.mutation({
            query: (data) => ({
                url: `/chat`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["chat","news_feed"]
          }),
    }),
})


export const { useGetChatListQuery } = chatSlices;