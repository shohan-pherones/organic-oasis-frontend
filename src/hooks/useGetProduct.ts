import { API_BASE_URL } from "@/constants";
import { IProductResponse } from "@/interfaces";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const useGetProduct = (productId?: string) => {
  const getProductRequestHandler = async (): Promise<IProductResponse> => {
    const res = await axios.get(`${API_BASE_URL}/products/${productId}`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IProductResponse, Error>(
    "fetchProduct",
    getProductRequestHandler,
    { enabled: !!productId }
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading };
};
