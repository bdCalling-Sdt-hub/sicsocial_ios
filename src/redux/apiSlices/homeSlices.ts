import {api} from '../api/baseApi';
import {INewFeeds} from '../interface/new_feed';

export const homeSlices = api.injectEndpoints({
  endpoints: builder => ({
    getNewsFeet: builder.query<INewFeeds, unknown>({
      query: ({id, page, limit}) => ({
        url: `/chat/news-feed`,
      }),
      providesTags: [
        'news_feed',
        'chat',
        'message',
        'facedown',
        'friend',
        'additional',
        'book',
        'payment',
      ],
    }),
  }),
});

export const {useGetNewsFeetQuery, usePrefetch: useNewsFeetPrefetch} =
  homeSlices;
