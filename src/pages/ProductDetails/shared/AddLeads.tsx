import { useEffect, useState } from "react";
import Layout from "../../../app/components/Layout/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../../../app/components/ui/button";
import { getAddLeads, getDynamicForm } from "../../../app/core/api/api.services";
import Swal from "sweetalert2";
import { ArrowLeft, Loader } from "lucide-react";
import type { Question } from "../../../app/lib/types";

export const AddLeads = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product_Id = searchParams.get("ID");

  const { mutateAsync: addLead } = getAddLeads();
  const { mutateAsync: getForm } = getDynamicForm();

  const [questions, setQuestions] = useState<Question[]>([]);
  type FormDataType = {
  [key: string]: string | string[];
};

const [formData, setFormData] = useState<FormDataType>({});
type FileItem = {
  id: string;
  file: File;
};

const [files, setFiles] = useState<FileItem[]>([]);
const [fileInputKey, setFileInputKey] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);

  const token = sessionStorage.getItem("session_token");
  const userId = sessionStorage.getItem("user_id");

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

 
  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const res = await getForm({ product_id: product_Id ?? "" });

      console.log("API RES:", res);

      if (res?.data?.questions) {
        setQuestions(res.data.questions);
      }
    } catch (error) {
      console.error("Failed to fetch form", error);
    }
  };

  if (product_Id) fetchQuestions();
}, [product_Id, getForm]);

  const handleChange = (id: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [id]: value,
    }));
  };


  const handleCheckboxChange = (id: string, option: string) => {
    setFormData((prev: any) => {
      const prevValues = prev[id] || [];

      if (prevValues.includes(option)) {
        return {
          ...prev,
          [id]: prevValues.filter((item: string) => item !== option),
        };
      } else {
        return {
          ...prev,
          [id]: [...prevValues, option],
        };
      }
    });
  };

  const handleFileChange = (id: string, file: File) => {
  if (file.size > 5 * 1024 * 1024) {
    alert("File must be less than 5MB");
    return;
  }

  setFiles((prev) => {
    const existingIndex = prev.findIndex((f) => f.id === id);

    if (existingIndex !== -1) {
      // replace file
      const updated = [...prev];
      updated[existingIndex] = { id, file };
      return updated;
    }

    // new file
    return [...prev, { id, file }];
  });
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = new FormData();
  const answers = questions.map((q) => ({
    id: q.id,
    input_element_type: q.input_element_type,
    value: formData[q.id] || (q.input_element_type === "checkboxes" ? [] : ""),
  }));

  const fileIds = files.map((f) => f.id);

  const jsonData = {
    product_id: product_Id || "",
    answers,
    file_upload_ids: fileIds,
  };


  payload.append("json_data", JSON.stringify(jsonData));

  files.forEach((f) => {
    payload.append("upload_files", f.file);
  });

  payload.append("user_id", userId || "");
  payload.append("session_token", token || "");

  try {
    setLoading(true);

    const response = await addLead(payload);

    if (response?.result?.toLowerCase() === "success") {
      Swal.fire("Success", response.message, "success");
    }
  } catch (error: any) {
    Swal.fire("Error", error?.response?.data?.message || "Error", "error");
  } finally {
    setLoading(false);
  }
};
const handleFileRemove = (id: string) => {
  setFiles((prev) => prev.filter((f) => f.id !== id));

  // 🔥 reset input by changing key
  setFileInputKey((prev) => ({
    ...prev,
    [id]: (prev[id] || 0) + 1,
  }));
};

  return (
    <Layout headerTitle="Add Leads">
      <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white w-full max-w-xl p-6 rounded-xl shadow space-y-5"
        >
          {/* Back */}
          <Button
              onClick={() => navigate(-1)}
              type="button"
              variant="outline"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowLeft size={16} />
              Back
            </Button>

          <h2 className="text-xl font-semibold text-center">
            Create Lead 
          </h2>

          {/* ✅ Dynamic Fields */}
          {questions.map((q) => {
            const required = q.is_mandatory === "yes";

            switch (q.input_element_type) {
              case "short_answer":
                return (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.title} {required && "*"}
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={formData[q.id] || ""}
                      onChange={(e) =>
                        handleChange(q.id, e.target.value)
                      }
                      required={required}
                    />
                  </div>
                );

              case "paragraph":
                return (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.title} {required && "*"}
                    </label>
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={formData[q.id] || ""}
                      onChange={(e) =>
                        handleChange(q.id, e.target.value)
                      }
                      required={required}
                    />
                  </div>
                );

              case "radio_button":
                return (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.title} {required && "*"}
                    </label>
                    {q.preset_values?.map((opt: string) => (
                      <label key={opt} className="flex gap-2">
                        <input
                          type="radio"
                          name={q.id}
                          value={opt}
                          checked={formData[q.id] === opt}
                          onChange={() => handleChange(q.id, opt)}
                          required={required}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                );

              case "checkboxes":
                return (
                  <div key={q.id}>
                    <label className={labelClass}>{q.title}</label>
                    {q.preset_values?.map((opt: string) => (
                      <label key={opt} className="flex gap-2">
                        <input
                          type="checkbox"
                          checked={(formData[q.id] || []).includes(opt)}
                          onChange={() =>
                            handleCheckboxChange(q.id, opt)
                          }
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                );

              case "dropdown":
                return (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.title} {required && "*"}
                    </label>
                    <select
                      className={inputClass}
                      value={formData[q.id] || ""}
                      onChange={(e) =>
                        handleChange(q.id, e.target.value)
                      }
                      required={required}
                    >
                      <option value="">Select</option>
                      {q.preset_values?.map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                );

              case "file_upload":
                return (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.title} {required && "*"}
                    </label>
                    <input
  key={fileInputKey[q.id] || 0} // 🔥 IMPORTANT
  type="file"
  className={inputClass}
  onChange={(e) =>
    e.target.files &&
    handleFileChange(q.id, e.target.files[0])
  }
  required={required}
/>
                    {files.find((f) => f.id === q.id) && (
  <div className="flex justify-between items-center mt-1">
    <span className="text-sm text-gray-600">
      {files.find((f) => f.id === q.id)?.file.name}
    </span>
    <button
      type="button"
      onClick={() => handleFileRemove(q.id)}
      className="text-red-500 text-sm"
    >
      Remove
    </button>
  </div>
)}
                  </div>
                );

              case "date":
                return (
                  <div key={q.id}>
                    <label className={labelClass}>
                      {q.title} {required && "*"}
                    </label>
                    <input
                      type="date"
                      className={inputClass}
                      value={formData[q.id] || ""}
                      onChange={(e) =>
                        handleChange(q.id, e.target.value)
                      }
                      required={required}
                    />
                  </div>
                );

              default:
                return null;
            }
          })}

          {/* Submit */}
          <div className="flex justify-center pt-2">
            <Button type="submit" className="bg-purple" disabled={loading}>
              {loading ? (
                <Loader className="animate-spin" />
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