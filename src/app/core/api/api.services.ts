import { useMutation } from "@tanstack/react-query";
import { POST } from "./axiosInstance";
import { API_URL } from "../constants/coreUrl";

type ProductsListPayload = {
  offset: string;
};

export type Product = {
  id: string;
  product_name: string;
  category: string;
  description: string;
  payout: string;
  orientation_content: string;
  lead_rules: string;
  status: string;
  created_at: string;
};

type ProductsListRes = {
  message: string;
  result: string;
  total_count: number;
  data: Product[];
};
export const getProductsList = () =>
  useMutation({
    mutationFn: (payload: ProductsListPayload) =>
      POST<ProductsListRes>({
        url: API_URL.getProductsList,
        data: payload,
      }),
  });

type ProductsDetailPayload = {
  product_id: string;
};

export type ProductDetail = {
  id: string;
  product_name: string;
  category: string;
  description: string;
  payout: string;
  orientation_content: string;
  lead_rules: string;
  text_content_title: string;
  text_content: string;
  poster_url: string;
  brochure_url: string;
  whatsapp_template_url: string;
  status: string;
  created_at: string;
};

type ProductsDetailRes = {
  message: string;
  result: string;
  data: ProductDetail[];
};
export const getProductsDetail = () =>
  useMutation({
    mutationFn: (payload: ProductsDetailPayload) =>
      POST<ProductsDetailRes>({
        url: API_URL.getProductDetail,
        data: payload,
      }),
  });
