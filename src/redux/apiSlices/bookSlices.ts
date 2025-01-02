import {lStorage, makeImage} from '../../utils/utils';

import RNFetchBlob from 'react-native-blob-util';
import {api} from '../api/baseApi';
import {ISingleBook} from '../interface/book';

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
    getAllBooks: builder.query<any, unknown>({
      query: () => ({
        url: `/books/all`,
      }),
      providesTags: ['book'],
      transformResponse(response: any) {
        // Save raw response to local storage (as a fallback)
        lStorage.setString('books', JSON.stringify(response));
        return response; // Return unmodified response
      },
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const {data} = await queryFulfilled;

          // Process the response to download or replace media files
          const updatedBooks = await Promise.all(
            data?.data?.map(async (book: any) => {
              const updatedBook = {...book};

              // Process each media type
              const mediaKeys = ['pdf', 'bookImage']; // Keys to process
              for (const key of mediaKeys) {
                if (book[key]) {
                  try {
                    // Generate local path for the file
                    const fileName = book[key].split('/').pop(); // Extract file name from URL
                    const localPath = `${RNFetchBlob.fs.dirs.DocumentDir}/${fileName}`;

                    // Check if the file exists locally
                    const fileExists = await RNFetchBlob.fs.exists(localPath);
                    if (fileExists) {
                      // Delete the existing file
                      await RNFetchBlob.fs.unlink(localPath);
                    }

                    // Download the new file
                    const res = await RNFetchBlob.config({
                      path: localPath,
                    }).fetch('GET', makeImage(book[key]));

                    // Replace the backend path with the local path
                    updatedBook[key] = res.path();
                  } catch (error) {
                    console.log(`Error processing ${key}:`, error);
                  }
                }
              }

              return updatedBook;
            }),
          );

          // Save the updated books with local paths into lStorage
          lStorage.setArray('books', updatedBooks);

          // Optionally, update RTK Query cache
          // dispatch(api.util.updateQueryData('getAllBooks', arg, () => updatedBooks));
        } catch (error) {
          console.log('Error in onQueryStarted:', error);
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
