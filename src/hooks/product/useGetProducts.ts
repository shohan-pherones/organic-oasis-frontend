import { API_BASE_URL } from "@/constants";
import { IProductsResponse } from "@/interfaces";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const useGetProducts = () => {
  const getProductsRequestHandler = async (): Promise<IProductsResponse> => {
    const res = await axios.get(`${API_BASE_URL}/products`);
    return res.data;
  };

  const { data, isLoading, error } = useQuery<IProductsResponse, Error>(
    "fetchProducts",
    getProductsRequestHandler
  );

  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.message || "An error occurred");
  }

  return { data, isLoading };
};
