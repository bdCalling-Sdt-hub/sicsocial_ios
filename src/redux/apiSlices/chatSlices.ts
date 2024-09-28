import {IChats} from '../interface/chat';
import {IMessages} from '../interface/message';
import {api} from '../api/baseApi';

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
      providesTags: ['chat', 'message'],
    }),

    createMessage: builder.mutation({
      query: data => ({
        url: `/message/send-message`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['message', 'news_feed'],
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
