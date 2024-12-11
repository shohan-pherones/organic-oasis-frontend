import { API_BASE_URL } from "@/constants";
import { IAuthResponse } from "@/interfaces";
import axios from "axios";
import { useMutation } from "react-query";

export const useSignUp = () => {
  const createUserAccountRequestHandler = async (
    registrationData: FormData
  ): Promise<IAuthResponse> => {
    const res = await axios.post(
      `${API_BASE_URL}/users/register`,
      registrationData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  };

  return useMutation<IAuthResponse, Error, FormData>(
    createUserAccountRequestHandler
  );
};
