// import axios, { AxiosRequestConfig } from "axios";
// import { getCookieToken } from "../store/Utils/Cookie";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../store";
// import moment from "moment";
// import { DELETE_TOKEN, SET_TOKEN } from "../store/Utils/Auth";
// import { userStateType } from "../store/Utils/User";

// export const useRefresh = async (
//   config: AxiosRequestConfig
// ): Promise<AxiosRequestConfig<any>> => {
//   const refreshToken = getCookieToken();
//   const dispatch = useDispatch();
//   const user = useSelector((state: userStateType) => state.user.data);
//   const expireAt = useSelector(
//     (state: RootState) => state.authToken.expireTime
//   );
//   let token = useSelector((state: RootState) => state.authToken.accessToken);

//   if (moment(expireAt).diff(moment()) < 0 && refreshToken) {
//     try {
//       const { data } = await axios.post("/token/refresh", {
//         refreshToken,
//         email: user.email,
//         name: user.name,
//       });
//       token = data.accessToken;
//       dispatch(SET_TOKEN(token)); // accessToken 갱신
//     } catch (error) {
//       console.error("토큰 갱신 실패", error);
//     }
//   }
//   return {
//     ...config,
//     headers: {
//       ...config.headers,
//       Authorization: `Bearer ${token}`,
//     },
//   } as AxiosRequestConfig;
// };

// export const useRefreshErrorHandle = (err: any) => {
//   const dispatch = useDispatch();
//   dispatch(DELETE_TOKEN());
// };
