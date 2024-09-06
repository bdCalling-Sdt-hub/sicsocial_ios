import {api} from '../../api/baseApi';
import {IAssignTasks, IPendingTasks, ITasks} from '../../interface/interface';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getTask: builder.query<ITasks, unknown>({
      query: ({token,page}) => ({
        url: `/task?page=${page}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['task'],
    }),
    getPendingTask: builder.query<IPendingTasks, unknown>({
      query: token => ({
        url: `/assign-task/pending`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['task'],
    }),
    getAssignTask: builder.query<IAssignTasks, unknown>({
      query: token => ({
        url: `/assign-task`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['task'],
    }),

    createTask: builder.mutation({
      query: ({token, data}) => ({
        url: `/task/create-task`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['task'],
    }),
    createAssignTask: builder.mutation({
      query: ({token, data}) => ({
        url: `/assign-task`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['task'],
    }),
    updateTask: builder.mutation({
      query: ({token, id, data}) => ({
        url: `/task/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['task'],
    }),
    approveTask: builder.mutation({
      query: ({token, id, data}) => ({
        url: `/assign-task/approve/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['task'],
    }),
    // deletedClass: builder.mutation({
    //   query: ({token, id}) => ({
    //     url: `/class/${id}`,
    //     method: 'DELETE',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }),
    //   invalidatesTags: ['class'],
    // }),
  }),
});

export const {
  useGetTaskQuery,
  useLazyGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetPendingTaskQuery,
  useGetAssignTaskQuery,
  useCreateAssignTaskMutation,
  useApproveTaskMutation
} = authSlice;
