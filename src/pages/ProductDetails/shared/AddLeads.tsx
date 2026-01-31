import { useState } from "react";
 import React from "react";
import Layout from "../../../app/components/Layout/Layout";
import { useNavigate } from "react-router-dom";

export const AddLeads = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    customerNumber: "",
    email: "",
    address: "",
    company: "",
    city: "",
    pincode: "",
    productSubscription: "",
  });

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form Data:", formData);
  // TODO: API call here
};
const navigate = useNavigate();

  return (
    <Layout headerTitle="Add Leads">
  <div className="min-h-[calc(100vh-80px)] bg-gray-100 flex items-center justify-center px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8"
    >
        <button
    type="button"
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
  >
    ← Back
  </button>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add Lead Details
      </h2>

      {/* Customer Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Name
        </label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Customer Number */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Customer Number
        </label>
        <input
          type="tel"
          name="customerNumber"
          value={formData.customerNumber}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Company */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company (Optional)
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* City + Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Product Subscription */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Subscription Details
        </label>
        <textarea
          name="productSubscription"
          value={formData.productSubscription}
          onChange={handleChange}
          required
          rows={3}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 rounded-md font-medium hover:bg-blue-700 transition"
      >
        Submit Lead
      </button>
    </form>
  </div>
</Layout>
  );
};