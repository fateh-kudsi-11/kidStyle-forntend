import { USER_URL } from "@/utils/constants";
import { apiSlice } from "@/redux/apiSlice";
import User, {
  UserReq,
  UserRegisterReq,
  UserUpdateDetailsReq,
  UserUpdatePasswordReq,
} from "@/types/User";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, UserReq>({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<User, UserRegisterReq>({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    getUserProfile: builder.query<User, void>({
      query: () => ({
        url: `${USER_URL}/me`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, UserUpdateDetailsReq>({
      query: (body) => ({
        url: `${USER_URL}/update-details`,
        method: "PUT",
        body,
      }),
    }),
    updatePassword: builder.mutation<string, UserUpdatePasswordReq>({
      query: (body) => ({
        url: `${USER_URL}/update-password`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetUserProfileQuery,
  useUpdateUserMutation,
  useUpdatePasswordMutation,
} = usersApiSlice;
