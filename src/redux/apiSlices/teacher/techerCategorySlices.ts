import {api} from '../../api/baseApi';
import {ICategories} from '../../interface/interface';

const authSlice = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<ICategories, unknown>({
      query: token => ({
        url: `/category`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['category'],
    }),

    createCategory: builder.mutation({
      query: ({token, data}) => ({
        url: `/category/create-category`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['category'],
    }),
    updateCategory: builder.mutation({
      query: ({token, id, data}) => ({
        url: `/category/${id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: ['category'],
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
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
} = authSlice;
