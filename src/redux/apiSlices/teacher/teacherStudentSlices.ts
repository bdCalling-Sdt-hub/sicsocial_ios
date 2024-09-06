import { IStatistics, IStudent, IStudents } from '../../interface/interface';

import { api } from '../../api/baseApi';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getStudents: builder.query<IStudents, unknown>({
      query: ({token,page}) => ({
        url: `/student?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['student'],
    }),
    getSingleStudent: builder.query<{data : IStudent}, unknown>({
      query: ({token, id}) => ({
        url: `/student/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: ['student'],
      }),
    }),
    getStatisticStudent: builder.query<IStatistics, unknown>({
      query: ({token, id}) => ({
        url: `/student/statistics/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: ['student'],
      }),
    }),
    getStudentThrowClass: builder.query<IStudents, unknown>({
      query: ({token, className}) => ({
        url: `/student/class/${className}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        providesTags: ['student'],
      }),
    }),
    createStudent: builder.mutation({
      query: ({token, data}) => ({
        url: `/student/create-student`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          
        },
        body: data,
      }),
      invalidatesTags: ['student'],
    }),
    // updateStudent: builder.mutation({
    //   query: ({token, id, data}) => ({
    //     url: `/class/${id}`,
    //     method: 'PATCH',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: data,
    //   }),
    //   invalidatesTags: ['class'],
    // }),
  }),
});

export const {
  useGetStudentsQuery,
  useLazyGetStudentsQuery,
  useLazyGetSingleStudentQuery,
  useCreateStudentMutation,
  useGetSingleStudentQuery,
  useGetStudentThrowClassQuery,
  useLazyGetStudentThrowClassQuery,
  useGetStatisticStudentQuery

} = authSlice;
