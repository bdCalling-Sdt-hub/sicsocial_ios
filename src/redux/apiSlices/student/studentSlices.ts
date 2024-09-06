import { IAssignRewards, IAssignStudentTasks, IEarnedStudentRewards } from '../../interface/interface';

import { api } from '../../api/baseApi';

const studentPartSlice = api.injectEndpoints({
  endpoints: builder => ({
    getStudentAssignTask: builder.query<IAssignStudentTasks, unknown>({
      query: token => ({
        url: `/assign-task/student`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['studentAssign'],
    }),
    getStudentAssignRewards: builder.query<IAssignRewards, unknown>({
      query: token => ({
        url: `/assign-reward/student`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['studentAssign'],
    }),
    getEarnRewards: builder.query<IEarnedStudentRewards, unknown>({
      query: token => ({
        url: `/assign-reward/earn`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['studentAssign'],
    }),
      studentAchieveAction: builder.mutation({
      query: ({token, id}) => ({
        url: `/assign-task/achieve/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['studentAssign',"studentUser"],
    }),
      studentClaimAction: builder.mutation({
      query: ({token, id}) => ({
        url: `/assign-reward/claim/${id}`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['studentAssign',"studentUser"],
    }),
  }),
});

export const {
 useGetEarnRewardsQuery,
 useGetStudentAssignRewardsQuery,
 useGetStudentAssignTaskQuery,
 useStudentAchieveActionMutation,
 useStudentClaimActionMutation
} = studentPartSlice;
