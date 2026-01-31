export interface GetStudentDetails {
  result: string;
  message: string;
  data: [
    {
      jeevitam_student_id: number;
      student_name: string;
      mobile_number: string;
      father_name: string;
      school_name: string;
      payment_status: string;
      capture_status: string;
      created_at: string;
    },
  ];
}

export interface GetSchoolResgistrations {
  result: string;
  message: string;
  id: number;
  amount: number;
}

export interface GetSchoolPaymentDetailsView {
  result: string;
  message: string;
  data: [
    {
      jeevitam_school_id: number;
      school_name: string;
      mobile_number: string;
      contact_name: string;
      email_id: string;
      total_registration: string;
      amount: number;
      created_at: string;
    },
  ];
}

export interface DashboardData {
  total_schools: number;
  link_created: number;
  pending: number;
  paid: number;
  pending_amount: number;
  paid_amount: number;
}

export interface GetDashboardValues {
  result: string;
  message: string;
  list: DashboardData[];
}

export interface GetAdminUserLogout {
  result: string;
  message: string;
}

export interface GetSchoolPaymentDetails {
  result: string;
  message: string;
  data: [
    {
      jeevitam_payment_id: number;
      phone_number: string;
      email: string;
      mode_of_payment: string;
      date_of_payment: string;
      transaction_id: string;
      payment_id: string;
      payment_status: string;
      capture_status: string;
      webhook_status: string;
      bank_name: string;
      amount: number;
      total_registration: number;
    },
  ];
}
export interface StudentDashboardData {
  total_registration: number;
  subjects_boarded: number;
  link_sent: number;
  paid: number;
}

// Represents the full API response
export interface GetStudentDashboardValues {
  result: string;
  message: string;
  list: StudentDashboardData[];
}

export interface GetStudentPaymentDetails {
  result: string;
  message: string;
  data: [
    {
      id: number;
      amount: number;
      payment_status: string;
      mode_of_payment: string;
      date_of_payment: string;
      transaction_id: string;
      payment_id: string;
      password: string;
      username: string;
      subjects: string;
    },
  ];
}

export interface GetSendPaymentLink {
  result: string;
  message: string;
}

// export interface DashboardData {
//   result: string;
//   message: string;
//   data: {
//     cards: {
//       total_society: number;
//       total_society_text: string;
//       toal_leads: number;
//       total_leads_text: string;
//       completed_tasks: number;
//       completed_task_text: string;
//       upcoming_tasks: number;
//       upcoming_task_text: string;
//     };
//     recent_activity: RecentActivityItem[];
//     upcoming_activity: UpcomingActivityItem[];
//   };
// }

// export interface RecentActivityItem {
//   society_name: string;
//   leads_generated: string | number;
//   pending?: string | null;
//   approved?: string | null;
// }

// export interface UpcomingActivityItem {
//   society_name: string;
//   start_date: string;
//   total_freelancers: string;
//   total_days: string;
// }

// export interface DashboardData1 {
//   data: {
//     cards: {
//       total_society: number;
//       total_society_text: string;
//       toal_leads: number;
//       total_leads_text: string;
//       completed_tasks: number;
//       completed_task_text: string;
//       upcoming_tasks: number;
//       upcoming_task_text: string;
//     };
//     recent_activity: {
//       society_name: string;
//       leads_generated: number | string;
//       pending?: string | null;
//       approved?: string | null;
//     }[];
//     upcoming_activity: {
//       society_name: string;
//       start_date: string;
//       total_freelancers: number | string;
//       total_days: number | string;
//     }[];
//   };
// }

// export type DashboardValuesResponse = {
//   result: string;
//   message: string;
//   data: {
//     cards: {
//       total_society: number;
//       total_society_text: string;
//       toal_leads: number; // (you have a typo: "toal" instead of "total" in your data)
//       total_leads_text: string;
//       completed_tasks: number;
//       completed_task_text: string;
//       upcoming_tasks: number;
//       upcoming_task_text: string;
//     };
//     recent_activity_header: {
//       society_name: string;
//       leads_generated: string;
//       approved: string;
//     };
//     recent_activity: {
//       society_name: string;
//       leads_generated: number;
//       pending: string | null;
//       approved: string | null;
//     }[];
//     upcoming_activity_header: {
//       society_name: string;
//       start_date: string;
//       total_freelancers: string;
//       total_days: string;
//     };
//     upcoming_activity: any[]; // No data was provided, so it’s `any[]` for now
//   };
// };

// export type Assignment = {
//   id: number;
//   brand_id: number;
//   start_date: string; // Format: "YYYY-MM-DD HH:MM:SS"
//   end_date: string;
//   start_time: string; // Format: "HH:MM:SS"
//   end_time: string;
//   payment_frequency: string;
//   assignment_description: string;
//   assignment_complete_date: string;
//   assignment_type: string;
//   assignment_name: string;
//   state: string;
//   city: string;
//   created_at: string;
//   updated_at: string;
//   created_by: number;
//   updated_by: number | null;
// };

// export type AssignmentListResponse = {
//   result: string;
//   message: string;
//   data: Assignment[];
// };

// export type Activity = {
//   id: number;
//   start_date: string;
//   start_time: string;
//   end_time: string;
//   activity_status: string;
//   total_freelancers: number;
//   total_leads: number;
// };

// export type ActivityListResponse = {
//   result: string;
//   message: string;
//   data: Activity[];
// };

// export type SocietyData = {
//   id: number;
//   created_at: string;
//   location: string;
//   max_payout: number;
//   total_tasks: number;
//   area: string;
//   file_path: string;
// };

// export type ViewSocietyDataResponse = {
//   result: string;
//   message: string;
//   data: SocietyData[];
// };

// export type Lead = {
//   id: number;
//   name: string;
//   contact_number: string;
//   society_name: string;
//   customer_id: string;
//   upload_pictures: string;
//   approval_status: string;
// };

// export type LeadsResponse = {
//   result: string;
//   message: string;
//   data: Lead[];
// };

// type LiveEventData = {
//   id: number;
//   activity_name: string;
//   activity_status: string;
//   location: string;
//   start_date: string;
//   start_time: string;
//   end_date: string;
//   end_time: string;
//   assignment_id: number;
//   brand_id: number;
//   latitude: number;
//   longitude: number;
//   total_freelancers: number;
//   total_leads: number;
// };

// export type LiveEventsResponse = {
//   result: string;
//   message: string;
//   data: LiveEventData[];
// };

// interface Task {
//   task_id: number;
//   activity_name: string;
//   start_date: string;
//   start_time: string;
//   end_time: string;
//   location_verification: "Verified" | "Pending" | "Rejected";
//   attendance_verification: "Verified" | "Pending" | "Rejected";
//   testimonial_verification: "Verified" | "Pending" | "Rejected";
//   payout: number | "N/A";
//   color: "Green" | "Grey" | "Red";
// }

// export interface TaskResponse {
//   result: string;
//   message: string;
//   total_freelancers: number;
//   data: Task[];
// }
