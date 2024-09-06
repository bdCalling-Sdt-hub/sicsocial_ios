import { IClass, IClasses } from '../../interface/interface';

import { api } from '../../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getClasses: builder.query<IClasses, unknown>({
      query: ({token,page}) => ({
        url: `/class?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['class'],
    }),

    getSingleClasses: builder.query<IClass, unknown>({
      query: ({token, id}) => ({
        url: `/class/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: ['class'],
      }),
    }),

    createClass: builder.mutation({
      query: ({token, data}) => ({
        url: `/class/create-class`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['class'],
    }),
    updateClass: builder.mutation({
      query: ({token, id, data}) => ({
        url: `/class/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['class'],
    }),
    deletedClass: builder.mutation({
      query: ({token, id}) => ({
        url: `/class/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['class'],
    }),
  }),
});

export const {
  useGetClassesQuery,
  useLazyGetClassesQuery,
  useCreateClassMutation,
  useDeletedClassMutation,
  useGetSingleClassesQuery,
  useUpdateClassMutation,
} = authSlice;
