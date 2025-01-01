import {IBooks, ISingleBook} from '../interface/book';

import {lStorage} from '../../utils/utils';
import {api} from '../api/baseApi';

export const bookSlices = api.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query<null, unknown>({
      query: ({id, page, limit}) => ({
        url: `/categories`,
      }),
      providesTags: ['book'],
    }),
    getBooks: builder.query<null, unknown>({
      query: ({id, page, limit}) => ({
        url: `/books`,
      }),

      providesTags: ['book'],
    }),
    getAllBooks: builder.query<IBooks, unknown>({
      query: ({id, page, limit}) => ({
        url: `/books/all`,
      }),
      providesTags: ['book'],
      transformResponse: (response: any) => {
        lStorage.setString('books', JSON.stringify(response));
        return response;
      },
    }),
    getBookById: builder.query<ISingleBook, unknown>({
      query: ({id, page, limit}) => ({
        url: `/books/${id}`,
      }),
      providesTags: ['book'],
    }),
    getCategoryBooks: builder.query<null, unknown>({
      query: ({category, page, limit}) => ({
        url: `/books/category/${category}`,
      }),
      providesTags: ['book'],
    }),
    // getBooks: builder.mutation({
    //     query: (data) => ({
    //         url: `/books`,
    //       method: 'POST',
    //       body: data,
    //     }),
    //     invalidatesTags : ["book"]
    //   }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetBooksQuery,
  useGetCategoryBooksQuery,
  useGetBookByIdQuery,
  useGetAllBooksQuery,
} = bookSlices;
