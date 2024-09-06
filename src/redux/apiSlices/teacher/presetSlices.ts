import { IPresets } from '../../interface/interface';

import { api } from '../../api/baseApi';

const presetSlice = api.injectEndpoints({
  endpoints: builder => ({
    getAvatarPreset: builder.query<IPresets, unknown>({
      query: token => ({
        url: `/preset/avatar`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),

    }),

    getIconsPreset: builder.query<IPresets, unknown>({
      query: token => ({
        url: `/preset/icon`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
 
      }),
    }),

   
  }),
});

export const {
useGetAvatarPresetQuery,
useGetIconsPresetQuery 
} = presetSlice;
