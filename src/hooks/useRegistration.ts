import { API_BASE_URL } from "@/constants";
import { IAuthResponse, IRegistration } from "@/interfaces";
import axios from "axios";
import { useMutation } from "react-query";

export const useRegistration = () => {
  const handler = async (data: IRegistration): Promise<IAuthResponse> => {
    const res = await axios.post(`${API_BASE_URL}/users/register`, data);
    return res.data;
  };

  return useMutation<IAuthResponse, Error, IRegistration>(handler);
};
