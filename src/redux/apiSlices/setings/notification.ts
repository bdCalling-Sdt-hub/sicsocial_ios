import {
  INotifications
} from '../../interface/interface';

import { api } from '../../api/baseApi';

const studentPartSlice = api.injectEndpoints({
  endpoints: builder => ({
    getNotifications: builder.query<
     INotifications,
      unknown
    >({
      query: ({token,page}) => ({
        url: `/notifications?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['notification'],
    }),
 

    readNotification: builder.mutation({
      query: ({token, id}) => ({
        url: `/notifications/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      
      }),
        invalidatesTags: ['notification'],
    }),
  }),
});

export const {useGetNotificationsQuery,useReadNotificationMutation} = studentPartSlice;
