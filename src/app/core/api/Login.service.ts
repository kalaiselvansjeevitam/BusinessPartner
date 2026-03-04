import { useMutation } from "@tanstack/react-query";
import { POST } from "./axiosInstance";
import { API_URL } from "../constants/coreUrl";

type loginPayload = {
  username: string;
  password: string;
};
type loginRes = {
  message: string;
  result: string;
  user_id: string;
  session_token: string;
};
export const login = () =>
  useMutation({
    mutationFn: (payload: loginPayload) =>
      POST<loginRes>({
        url: API_URL.login,
        data: payload,
      }),
  });
