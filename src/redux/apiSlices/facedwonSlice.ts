import {IFacedownSingle, IFacedowns} from '../interface/facedown';

import {api} from '../api/baseApi';

export const faceDownSlices = api.injectEndpoints({
  endpoints: builder => ({
    getFaceDown: builder.query<IFacedowns, unknown>({
      query: ({id, page, limit}) => ({
        url: `/facedowns`,
      }),
      providesTags: ['facedown'],
    }),
    getFaceDownOthers: builder.query<IFacedowns, unknown>({
      query: ({id, page, limit}) => ({
        url: `/facedowns/others`,
      }),
      providesTags: ['facedown'],
    }),
    getFaceDownById: builder.query<IFacedownSingle, unknown>({
      query: ({id, page, limit}) => ({
        url: `/facedowns/${id}`,
      }),
      providesTags: ['facedown'],
    }),
    createFaceDown: builder.mutation({
      query: data => ({
        url: `/facedowns`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['facedown'],
    }),
    deleteFacedown: builder.mutation({
      query: id => ({
        url: `/facedowns/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['facedown'],
    }),
    updateFacedown: builder.mutation({
      query: ({id, data}) => ({
        url: `/facedowns/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['facedown'],
    }),
  }),
});

export const {
  useCreateFaceDownMutation,
  useGetFaceDownQuery,
  useDeleteFacedownMutation,
  useGetFaceDownByIdQuery,
  useUpdateFacedownMutation,
  useGetFaceDownOthersQuery,
} = faceDownSlices;
