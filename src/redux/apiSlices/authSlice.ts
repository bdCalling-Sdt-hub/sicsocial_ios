import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getUserProfile: builder.query({
            query: token => ({
                url : `/users/profile`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }),
            providesTags : ["user"]
          }),
   loginUser : builder.mutation({
            query: (data) => ({
              url : `/auth/login`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
   createUser: builder.mutation({
            query: (data) => ({
              url: `/users/create-user`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
   verifyUser: builder.mutation({
            query: (data) => ({
              url: `/auth/verify-otp`,
              method: 'POST',
              body: data,
            }),
            invalidatesTags : ["user"]
          }),
    })
});

export const {
  useGetUserProfileQuery,
  useCreateUserMutation,
  useLoginUserMutation
} = authSlice;