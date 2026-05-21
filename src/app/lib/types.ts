export interface ProductsListPayload {
  offset: string;
}

export interface Product {
  id: string;
  product_name: string;
  category: string;
  description: string;
  payout: string;
  orientation_content: string;
  lead_rules: string;
  status: string;
  created_at: string;
  product_logo_url: string;
}

export interface ProductsDetailPayload {
  product_id: string;
}

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
  show_interest_status: string;
};

export interface ProductsDetailRes {
  message: string;
  result: string;
  data: ProductDetail[];
}

export type ProfileDetail = {
  name: string;
  date_of_birth: string;
  gender: string;
  profile: string;
  phone_number: string;
  email_id: string;
  street_address: string;
  city: string;
  state_region_province: string;
  zip_code: string;
  qualification: string;
  occupation: string;
  experience: string;
  bank_account_number: string;
  ifsc_code: string;
  account_holder_name: string;
  pan_number: string;
  aadhaar_number: string;
};

export interface ProfileDetailRes {
  message: string;
  result: string;
  data: ProfileDetail;
}
export interface UpdateProfileDetailRes {
  message: string;
  result: string;
  data: [];
}

export interface StatesDetail {
  state: string;
}

export interface StatesRes {
  message: string;
  result: string;
  list: StatesDetail[];
}

export interface LeadList {
  id: number;
  lead_name: string;
  mobile_number: string;
  education_level: string;
  state: string;
  created_at: string;
}

export interface LeadListRes {
  message: string;
  result: string;
  total_count: number;
  data: LeadList[];
}

export interface ResMsg {
  result: string;
  message: string;
}

export type InputElementType =
  | "short_answer"
  | "paragraph"
  | "radio_button"
  | "checkboxes"
  | "dropdown"
  | "file_upload"
  | "date";

export interface Question {
  id: string;
  input_element_type: InputElementType;
  title: string;
  is_mandatory: "yes" | "no";
  preset_values?: string[]; // optional (only for select/radio/checkbox)
  answered: string[] | "";
}
export interface DynamicFormResponse {
  result: string;
  message: string;
  data: {
    questions: Question[];
  };
}

export interface DashboardValue {
  total_leads_created: number;
  leads_in_progress: number;
  leads_converted: number;
  leads_rejected: number;
  total_earnings: number;
  pending_payout: number;
}

export interface DashboardValueRes {
  message: string;
  result: string;
  data: DashboardValue;
}

export interface LeadsChartItem {
  name: string;
  leads: number;
}

export interface LeadsChartData {
  day: LeadsChartItem[];
  week: LeadsChartItem[];
  month: LeadsChartItem[];
}

export interface LeadsChartResponse {
  result: string;
  message: string;
  data: LeadsChartData;
}

export interface ConversionRatioItem {
  name: string;
  value: number;
}

export interface ConversionRatioResponse {
  result: string;
  message: string;
  data: ConversionRatioItem[];
}
