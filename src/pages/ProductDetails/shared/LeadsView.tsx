import { useState } from "react";
import Layout from "../../../app/components/Layout/Layout";
import TableComponent, {
  type Column,
} from "../../../app/components/shared/TableComponent";
import type { LeadData } from "../../../app/lib/types"; // adjust path if needed

export const LeadsView = () => {
  const [leads] = useState<LeadData[]>([
    {
      customer_name: "Kalai",
      customer_number: "9486171860",
      email: "kalaiselvansk@gmail.com",
      address: "1/71,school street,perugudi, chennai",
      company: "Techsolve Pvt Ltd",
      city: "Chennai",
      pincode: "600001",
    },
    {
      customer_name: "Giri",
      customer_number: "8754633583",
      email: "jgiritharan@gmail.com",
      address: "172,vivegananthar street, anna nagar,chennai",
      company: "Giri Solutions",
      city: "Chennai",
      pincode: "600009",
    },
  ]);

  const columns: Column[] = [
    { key: "customer_name", label: "Customer Name", align: "left" },
    { key: "customer_number", label: "Customer Number", align: "center" },
    { key: "email", label: "Email", align: "left" },
    { key: "address", label: "Address", align: "left" },
    { key: "company", label: "Company", align: "left" },
    { key: "city", label: "City", align: "center" },
    { key: "pincode", label: "Pincode", align: "center" },
  ];

  return (
    <Layout headerTitle="View Leads">
      <div className="mt-4 px-4">
        <TableComponent columns={columns} data={leads} itemsPerPage={10} />
      </div>
    </Layout>
  );
};
