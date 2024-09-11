import { api } from "../api/baseApi";
import { IChats } from "../interface/interface";

export const chatSlices = api.injectEndpoints({
    endpoints: (builder) => ({
        getChatList: builder.query<IChats , unknown>({
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
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
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
            invalidatesTags : ["news_feed"]
          }),
    }),
})


export const { useGetChatListQuery ,useCreateChatMutation,useCreateMessageMutation,useGetMessageQuery } = chatSlices;