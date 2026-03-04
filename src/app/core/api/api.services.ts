import { useMutation } from "@tanstack/react-query";
import { POST } from "./axiosInstance";
import { API_URL } from "../constants/coreUrl";
import type {
  LeadListRes,
  Product,
  ProductsDetailPayload,
  ProductsDetailRes,
  ProductsListPayload,
  ProfileDetailRes,
  StatesRes,
  UpdateProfileDetailRes,
} from "../../lib/types";

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

export const getProductsDetail = () =>
  useMutation({
    mutationFn: (payload: ProductsDetailPayload) =>
      POST<ProductsDetailRes>({
        url: API_URL.getProductDetail,
        data: payload,
      }),
  });

export const getProfileDetails = () =>
  useMutation({
    mutationFn: () =>
      POST<ProfileDetailRes>({
        url: API_URL.getProfileDetial,
      }),
  });

export const getUpdateDetails = () =>
  useMutation({
    mutationFn: (formData: FormData) =>
      POST<UpdateProfileDetailRes>({
        url: API_URL.updateProfileDetails,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  });

export const getAddLeads = () =>
  useMutation({
    mutationFn: (formData: FormData) =>
      POST<UpdateProfileDetailRes>({
        url: API_URL.addLeads,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  });

export const getStates = () =>
  useMutation({
    mutationFn: () =>
      POST<StatesRes>({
        url: API_URL.getStates,
      }),
  });

export const getViewLeads = () =>
  useMutation({
    mutationFn: (data: { offset: number; product_id: string }) =>
      POST<LeadListRes>({
        url: API_URL.viewLeads,
        data,
      }),
  });
