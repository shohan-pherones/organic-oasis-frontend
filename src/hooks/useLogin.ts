import { API_BASE_URL } from "@/constants";
import { IAuthResponse, ILogin } from "@/interfaces";
import axios from "axios";
import { useMutation } from "react-query";

export const useLogin = () => {
  const handler = async (data: ILogin): Promise<IAuthResponse> => {
    const res = await axios.post(`${API_BASE_URL}/users/login`, data);
    return res.data;
  };

  return useMutation<IAuthResponse, Error, ILogin>(handler);
};
