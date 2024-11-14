import {api} from '../api/baseApi';
import {ISingleLive} from '../interface/live';

export const liveSlices = api.injectEndpoints({
  endpoints: builder => ({
    getLiveChat: builder.query<ISingleLive, unknown>({
      query: id => ({
        url: `/live/${id}`,
      }),
      providesTags: ['live'],
    }),
    joinLive: builder.mutation({
      query: data => ({
        url: `/live`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['live'],
    }),
    createLive: builder.mutation({
      query: data => ({
        url: `/live/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['live'],
    }),
    permissionRole: builder.mutation({
      query: data => ({
        url: `/live/permission`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['live'],
    }),
  }),
});

export const {
  useCreateLiveMutation,
  useJoinLiveMutation,
  usePermissionRoleMutation,
  useGetLiveChatQuery,
} = liveSlices;
