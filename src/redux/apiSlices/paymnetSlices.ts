import {api} from '../api/baseApi';

export const paymentSlices = api.injectEndpoints({
  endpoints: builder => ({
    paymentRecord: builder.mutation({
      query: data => ({
        url: `/payments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['payment'],
    }),
    paymentIntent: builder.mutation({
      query: data => ({
        url: `/payments/payment-intent/create`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['payment'],
    }),
  }),
});

export const {usePaymentRecordMutation, usePaymentIntentMutation} =
  paymentSlices;
