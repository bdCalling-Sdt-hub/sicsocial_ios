import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getStorageToken, removeStorageToken } from '../../utils/utils';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.10.185:5001/api/v1',
  prepareHeaders: async (headers, { getState }) => {
    const token = getStorageToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
      headers.getSetCookie()
    }
    return headers;
  },
});

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  // const socket = getSocket();

  // if (!socket){
  //   initiateSocket();
  // }
  
  let result = await baseQuery(args, api, extraOptions);
  // console.log(result);
  if(result?.error?.status === "FETCH_ERROR"){
    // Alert.alert(result.error.error)
  }
  if (result?.error?.status === 401) {
    // Handle token refresh logic here if needed
    // For now, we'll log out the user
    // removeStorageRole();
    removeStorageToken();
  }
  return result;
};


export const api = createApi({
  reducerPath: 'api',
  // keepUnusedDataFor: 0,
  baseQuery: baseQueryWithReauth,
  
  endpoints: () => ({}),
  tagTypes: ['user', 'class', 'student', 'category', 'task',"Rewards","studentAssign" ,"studentUser","notification"],
});


export const imageUrl = 'http://192.168.10.185:5001';