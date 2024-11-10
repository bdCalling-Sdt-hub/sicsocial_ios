import {api} from '../api/baseApi';
import {IMessages} from '../interface/message';

export const chatSlices = api.injectEndpoints({
  endpoints: builder => ({
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
        },
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['message'],
    }),
  }),
});

export const {
  useCreateMessageMutation,
  useGetMessageQuery,
  useLazyGetMessageQuery,
} = chatSlices;
