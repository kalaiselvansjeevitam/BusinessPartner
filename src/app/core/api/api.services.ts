import { useMutation } from "@tanstack/react-query";
import { POST } from "./axiosInstance";
import { API_URL } from "../constants/coreUrl";
import type {
  ConversionRatioResponse,
  DashboardValueRes,
  DynamicFormResponse,
  getDashboardProductsListResponse,
  LeadListRes,
  LeadsChartResponse,
  Product,
  ProductsDetailPayload,
  ProductsDetailRes,
  ProductsListPayload,
  ProfileDetailRes,
  ResMsg,
  ResMsgwithData,
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

export const getShowInterest = () =>
  useMutation({
    mutationFn: (data: { partner_id: string; product_id: string }) =>
      POST<ResMsg>({
        url: API_URL.showInterest,
        data,
      }),
  });

export const uploadBPSignedAgreement = () =>
  useMutation({
    mutationFn: (formData: FormData) =>
      POST<ResMsg>({
        url: API_URL.uploadBPSignedAgreement,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  });
export const getDynamicForm = () =>
  useMutation({
    mutationFn: (data: { product_id: string }) =>
      POST<DynamicFormResponse>({
        url: API_URL.DynamicForm,
        data,
      }),
  });

export const getLeadValidationRulesByProductAndUserId = () =>
  useMutation({
    mutationFn: (data: {
      product_id: string;
      session_token: string;
      user_id: string;
    }) =>
      POST<DynamicFormResponse>({
        url: API_URL.getLeadValidationRulesByProductAndUserId,
        data,
      }),
  });

export const getUpdateLeads = () =>
  useMutation({
    mutationFn: (formData: FormData) =>
      POST<UpdateProfileDetailRes>({
        url: API_URL.updateLeadValidationAnswersByProductAndUserId,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
  });

export const getDashboardSummaryValues = () =>
  useMutation({
    mutationFn: () =>
      POST<DashboardValueRes>({
        url: API_URL.getDashboardSummaryValues,
      }),
  });

export const getLeadsRegistraionsCountForLineChart = () =>
  useMutation({
    mutationFn: () =>
      POST<LeadsChartResponse>({
        url: API_URL.getLeadsRegistraionsCountForLineChart,
      }),
  });

export const getconversionRatioPieChart = () =>
  useMutation({
    mutationFn: () =>
      POST<ConversionRatioResponse>({
        url: API_URL.getconversionRatioPieChart,
      }),
  });
export const getDashboardProductsList = () =>
  useMutation({
    mutationFn: (data: {
      from_date: string;
      to_date: string;
      offset: string;
    }) =>
      POST<getDashboardProductsListResponse>({
        url: API_URL.getDashboardProductsList,
        data,
      }),
  });

export const getProductsLeadsByBusinessPartner = () =>
  useMutation({
    mutationFn: (data: {
      from_date: string;
      to_date: string;
      offset: string;
    }) =>
      POST<ResMsgwithData>({
        url: API_URL.getProductsLeadsByBusinessPartner,
        data,
      }),
  });
