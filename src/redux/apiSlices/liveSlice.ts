import {ISingleLive} from '../interface/live';
import {api} from '../api/baseApi';

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
    request: builder.mutation({
      query: data => ({
        url: `/live/request`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['live'],
    }),
    leaveLive: builder.mutation({
      query: data => ({
        url: `/live/remove`,
        method: 'PATCH',
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
  useRequestMutation,
  useLeaveLiveMutation,
} = liveSlices;
