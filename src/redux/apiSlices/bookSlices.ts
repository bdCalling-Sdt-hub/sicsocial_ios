import {IBooks, ISingleBook} from '../interface/book';

import RNFetchBlob from 'react-native-blob-util';
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
      transformResponse(response: any) {
        // Save the raw response to local storage (for fallback purposes)
        lStorage.setString('books', JSON.stringify(response));
        // console.log(response);
        return response; // Return the raw response for now
      },
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          // Wait for the original query to complete
          const {data} = await queryFulfilled;

          // Process the response and download PDFs
          const updatedBooks = await Promise.all(
            data?.data.map(async (book: any) => {
              if (book.pdfUrl) {
                try {
                  const res = await RNFetchBlob.config({fileCache: true}).fetch(
                    'GET',
                    book.pdfUrl,
                  );
                  const localPath = res.path();
                  return {...book, pdfUrl: localPath}; // Replace with local path
                } catch (error) {
                  console.error('Error downloading PDF:', error);
                  return book; // Return the original book if download fails
                }
              }
              return book;
            }),
          );

          // Save updated books with local paths to local storage
          lStorage.setString('books', JSON.stringify(updatedBooks));

          // Optionally, update the cache manually (if needed)
          // dispatch(api.util.updateQueryData('getAllBooks', arg, () => updatedBooks));
        } catch (error) {
          console.error('Error in onQueryStarted:', error);
        }
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
