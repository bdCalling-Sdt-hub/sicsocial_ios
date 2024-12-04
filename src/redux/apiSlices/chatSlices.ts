import {api} from '../api/baseApi';
import {IChats} from '../interface/chat';

export const chatSlices = api.injectEndpoints({
  endpoints: builder => ({
    getChatList: builder.query<IChats, unknown>({
      query: ({id, page, limit}) => ({
        url: `/chat/chat-list`,
      }),
      providesTags: ['chat'],
    }),
    createChat: builder.mutation({
      query: data => ({
        url: `/chat`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['chat'],
    }),

    addMember: builder.mutation({
      query: ({id, participants}) => ({
        url: `/chat/update-conversation/${id}`,
        method: 'PATCH',
        body: {participants},
      }),
      invalidatesTags: ['chat'],
    }),
    getMembers: builder.query({
      query: id => ({
        url: `/chat/participants/${id}`,
      }),
      providesTags: ['chat'],
    }),
  }),
});

export const {
  useGetChatListQuery,
  useCreateChatMutation,
  useAddMemberMutation,
  useGetMembersQuery,
  usePrefetch: useChatPrefetch,
} = chatSlices;
