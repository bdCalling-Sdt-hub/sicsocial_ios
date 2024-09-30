import {api} from '../api/baseApi';
import {IChats} from '../interface/chat';
import {IMessages} from '../interface/message';

export const chatSlices = api.injectEndpoints({
  endpoints: builder => ({
    getChatList: builder.query<IChats, unknown>({
      query: ({id, page, limit}) => ({
        url: `/chat/chat-list`,
      }),
      providesTags: ['chat', 'message'],
    }),
    getMessage: builder.query<IMessages, unknown>({
      query: ({id, page, limit}) => ({
        url: `/message/chatId/${id}`,
      }),
      providesTags: ['message'],
    }),

    createMessage: builder.mutation({
      query: data => ({
        url: `/message/send-message`,
        headers: {
          'Content-Type': 'multipart/form-data',
          Connection: 'keep-alive',
          Accept: '*/*',
          'Cache-Control': 'no-cache',
        },
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['message'],
    }),

    createChat: builder.mutation({
      query: data => ({
        url: `/chat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['chat', 'news_feed'],
    }),

    addMember: builder.mutation({
      query: ({id, participants}) => ({
        url: `/chat/update-conversation/${id}`,
        method: 'PATCH',
        body: {participants},
      }),
      invalidatesTags: ['chat'],
    }),
  }),
});

export const {
  useGetChatListQuery,
  useCreateChatMutation,
  useCreateMessageMutation,
  useGetMessageQuery,
  useAddMemberMutation,
} = chatSlices;
