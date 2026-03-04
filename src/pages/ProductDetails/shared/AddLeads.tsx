import { useEffect, useState } from "react";
import Layout from "../../../app/components/Layout/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../../app/components/ui/button";
import { getAddLeads, getStates } from "../../../app/core/api/api.services";
import Swal from "sweetalert2";
import { Loader } from "lucide-react";
import type { StatesDetail } from "../../../app/lib/types";

export const AddLeads = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product_Id = searchParams.get("ID");
  const { mutateAsync: addLead } = getAddLeads();
  const { mutateAsync: getStatesApi } = getStates();
  const [states, setStates] = useState<StatesDetail[]>([]);

  const [loading, setLoading] = useState(false);
  const token = sessionStorage.getItem("session_token");
  const userId = sessionStorage.getItem("user_id");
  const [formData, setFormData] = useState({
    user_id: userId,
    session_token: token,
    product_id: product_Id,
    candidate_id: "",
    candidate_name: "",
    mobile_number: "",
    state: "",
    candidate_address: "",
    age: "",
    religion: "",
    marital_status: "",
    differently_abled: "",
    education_level: "",
    digital_proficiency_level: "",
    english_proficiency_level: "",
    family_income: "",
    having_bank_account: "",
    bank_holder_name: "",
    bank_name: "",
    bank_ifsc_code: "",
    bank_account_number: "",
  });
  const [qualificationImage, setQualificationImage] = useState<File | null>(
    null,
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    if (!file) return;
    setQualificationImage(file);
  };
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await getStatesApi();

        if (res.result === "success") {
          setStates(res.list);
        } else {
          console.error("States API returned error:", res.message);
        }
      } catch (error) {
        console.error("Failed to fetch States", error);
      }
    };

    fetchStates();
  }, [getStatesApi]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const age = Number(formData.age);
    if (age < 18 || age > 60) {
      alert("Age must be between 18 and 60");
      return;
    }

    console.log("Form Data:", formData);
    const payload = new FormData();
    payload.append("json_data", JSON.stringify(formData));
    if (qualificationImage) {
      payload.append("qualification_certificate", qualificationImage);
    }
    for (const pair of payload.entries()) {
      console.log(pair[0], pair[1]);
    }
    try {
      setLoading(true);
      const response = await addLead(payload);
      if (response.result.toLowerCase() == "success") {
        Swal.fire("Success", response?.message, "success");
      }
      setLoading(false);
    } catch (error: any) {
      Swal.fire("Error", error?.response?.data?.message, "error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <Layout headerTitle="Add Leads">
      <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-xl p-6 rounded-xl shadow space-y-5"
        >
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="text-sm text-gray-600"
          >
            ← Back
          </button>

          <h2 className="text-xl font-semibold text-center">Add Leads</h2>

          {/* Candidate ID */}
          <div>
            <label className={labelClass}>Candidate ID</label>
            <input
              name="candidate_id"
              value={formData.candidate_id}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Candidate Name */}
          <div>
            <label className={labelClass}>Candidate Name</label>
            <input
              name="candidate_name"
              value={formData.candidate_name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className={labelClass}>Mobile Number</label>
            <input
              name="mobile_number"
              value={formData.mobile_number}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, ""); // remove non-numbers
                setFormData((prev) => ({ ...prev, mobile_number: value }));
              }}
              className={inputClass}
              maxLength={10}
              inputMode="numeric"
              pattern="[0-9]*"
              required
            />
          </div>

          {/* State */}
          <div>
            <label className={labelClass}>State</label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select State</option>
              {states.map((item) => (
                <option key={item.state} value={item.state}>
                  {item.state}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className={labelClass}>Address</label>
            <textarea
              name="candidate_address"
              rows={3}
              value={formData.candidate_address}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className={labelClass}>Age</label>
            <input
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className={labelClass}>Marital Status</label>
            <div className="space-y-2">
              {["Single", "Married"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="marital_status"
                    value={option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Differently Abled */}
          <div>
            <label className={labelClass}>Differently Abled</label>
            <div className="space-y-2">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="differently_abled"
                    value={option}
                    onChange={handleChange}
                    required
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <label className={labelClass}>Education Level</label>
            <select
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select</option>
              <option>Under 10th</option>
              <option>10th Pass</option>
              <option>12th Pass</option>
              <option>Graduate</option>
              <option>Post Graduate</option>
            </select>
          </div>

          {/* Digital Proficiency */}
          <div>
            <label className={labelClass}>Digital Proficiency</label>
            <div className="space-y-2">
              {["basic", "intermediate", "advance"].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="digital_proficiency_level"
                    value={formData.digital_proficiency_level}
                    onChange={handleChange}
                    required
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>English Proficiency</label>
            <div className="space-y-2">
              {["basic", "intermediate", "advance"].map((level) => (
                <label key={level} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="english_proficiency_level"
                    value={formData.english_proficiency_level}
                    onChange={handleChange}
                    required
                  />
                  {level}
                </label>
              ))}
            </div>
          </div>

          {/* Certificate */}
          <div>
            <label className={labelClass}>
              Qualification Certificate (Max 5MB)
            </label>

            <input
              type="file"
              onChange={handleFileChange}
              required
              className={`${inputClass}
      file:mr-4
      file:py-2
      file:px-4
      file:rounded-md
      file:border-0
      file:text-sm
      file:font-medium
      file:bg-blue-50
      file:text-blue-700
      hover:file:bg-blue-100
      cursor-pointer
    `}
            />
          </div>

          {/* Family Income */}
          <div>
            <label className={labelClass}>Family Income</label>
            <select
              name="family_income"
              value={formData.family_income}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select</option>
              <option>Less than 3 lakh</option>
              <option>3–5 lakh</option>
              <option>5–10 lakh</option>
              <option>More than 10 lakh</option>
            </select>
          </div>

          {/* Bank Account */}
          <div>
            <label className={labelClass}>Bank Account Available?</label>
            <div className="space-y-2">
              {["Yes", "No"].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="having_bank_account"
                    value={option}
                    required
                    onChange={handleChange}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>

          {formData.having_bank_account === "Yes" && (
            <>
              <div>
                <label className={labelClass}>Account Holder Name</label>
                <input
                  name="bank_holder_name"
                  className={inputClass}
                  required
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className={labelClass}>Bank Name</label>
                <input
                  name="bank_name"
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>IFSC Code</label>
                <input
                  name="bank_ifsc_code"
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Account Number</label>
                <input
                  name="bank_account_number"
                  className={inputClass}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="flex justify-center pt-2">
            <Button type="submit" className="bg-purple" disabled={loading}>
              {loading ? (
                <div className=" flex justify-center">
                  <Loader className=" animate-spin" />
                </div>
              ) : (
                "Create Lead"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
