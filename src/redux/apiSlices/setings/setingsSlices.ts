
import { api } from '../../api/baseApi';

const studentPartSlice = api.injectEndpoints({
  endpoints: builder => ({
    getPrivacyPolicy: builder.query<
      {
        data : {
          _id: string;
        content: string;
        __v: number;
        }
      },
      unknown
    >({
      query: token => ({
        url: `/rule/privacy-policy`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // providesTags: ['s'],
    }),
   getTermsAndConditions: builder.query<
      {
       data : {
        _id: string;
        content: string;
        __v: number;
       }
      },
      unknown
    >({
      query: token => ({
        url: `/rule/terms-and-conditions`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      // providesTags: ['s'],
    }),

    sendFeedBack: builder.mutation({
      query: ({token, data}) => ({
        url: `/feedback`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      //   invalidatesTags: ['studentAssign'],
    }),
  }),
});

export const {useSendFeedBackMutation,useGetPrivacyPolicyQuery,useGetTermsAndConditionsQuery} = studentPartSlice;
