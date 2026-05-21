import { useEffect, useState } from "react";
import { Loader, Upload, X } from "lucide-react";
// import Swal from "sweetalert2";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../../../app/components/ui/sheet";

import { Button } from "../../../app/components/ui/button";

import {
  getLeadValidationRulesByProductAndUserId,
  getUpdateLeads,
} from "../../../app/core/api/api.services";

import type { Question } from "../../../app/lib/types";

/* ---------- TYPES ---------- */

type StudentSheetProps = {
  open: boolean;
  workshopId: string | null;
  openClose: (updated?: boolean) => void;
};

type FormDataType = {
  [key: string]: string | string[];
};

type FileItem = {
  id: string;
  file: File;
};

/* ---------- COMPONENT ---------- */

const SchoolSheet = ({ open, workshopId, openClose }: StudentSheetProps) => {
  /* ---------- API ---------- */

  const { mutateAsync: getForm } = getLeadValidationRulesByProductAndUserId();

  const { mutateAsync: updateLead } = getUpdateLeads();

  /* ---------- STATES ---------- */

  const [loaderside, setLoaderside] = useState(false);
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [formData, setFormData] = useState<FormDataType>({});

  const [files, setFiles] = useState<FileItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [fileInputKey, setFileInputKey] = useState<{
    [key: string]: number;
  }>({});

  /* ---------- SESSION ---------- */

  const token = sessionStorage.getItem("session_token");

  const userId = sessionStorage.getItem("user_id");

  /* ---------- STYLES ---------- */

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm shadow-sm transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200";

  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  /* ---------- FETCH FORM ---------- */

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoaderside(true);

        const res = await getForm({
          product_id: workshopId ?? "",
          session_token: token ?? "",
          user_id: userId ?? "",
        });

        console.log("API RESPONSE", res);

        // ✅ CORRECT RESPONSE PATH
        const fetchedQuestions = res?.data?.questions || [];

        setQuestions(fetchedQuestions);

        /* ---------- PREFILL ---------- */

        const defaultValues: FormDataType = {};

        fetchedQuestions.forEach((q: Question) => {
          // ✅ checkbox should always array
          if (q.input_element_type === "checkboxes") {
            defaultValues[q.id] = Array.isArray(q.answered) ? q.answered : [];
          } else {
            defaultValues[q.id] =
              typeof q.answered === "string" ? q.answered : "";
          }
        });

        console.log("DEFAULT VALUES", defaultValues);

        setFormData(defaultValues);
      } catch (error) {
        console.log("Failed to load form");
      } finally {
        setLoaderside(false);
      }
    };

    if (open && workshopId) {
      fetchQuestions();
    }
  }, [open, workshopId]);

  /* ---------- HANDLE CHANGE ---------- */

  const handleChange = (id: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  /* ---------- CHECKBOX ---------- */

  const handleCheckboxChange = (id: string, option: string) => {
    setFormData((prev: any) => {
      const prevValues = prev[id] || [];

      if (prevValues.includes(option)) {
        return {
          ...prev,
          [id]: prevValues.filter((item: string) => item !== option),
        };
      }

      return {
        ...prev,
        [id]: [...prevValues, option],
      };
    });
  };

  /* ---------- FILE ---------- */

  const handleFileChange = (id: string, file: File) => {
    // if (file.size > 5 * 1024 * 1024) {
    //   Swal.fire("Validation", "File size must be less than 5MB", "warning");
    //   return;
    // }

    setFiles((prev) => {
      const existingIndex = prev.findIndex((f) => f.id === id);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          id,
          file,
        };
        return updated;
      }

      return [...prev, { id, file }];
    });
  };

  /* ---------- REMOVE FILE ---------- */

  const handleFileRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));

    setFileInputKey((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };
  /* ---------- AUTO HIDE MESSAGE ---------- */

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000); // disappear after 3 sec

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  /* ---------- SUBMIT ---------- */

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // clear old messages
      setErrorMessage("");
      setSuccessMessage("");

      const payload = new FormData();

      const answers = questions.map((q) => ({
        id: q.id,
        input_element_type: q.input_element_type,
        value:
          formData[q.id] || (q.input_element_type === "checkboxes" ? [] : ""),
      }));

      const fileIds = files.map((f) => f.id);

      const jsonData = {
        product_id: workshopId || "",
        answers,
        file_upload_ids: fileIds,
      };

      payload.append("json_data", JSON.stringify(jsonData));

      files.forEach((f) => {
        payload.append("upload_files", f.file);
      });

      payload.append("user_id", userId || "");

      payload.append("session_token", token || "");

      const response = await updateLead(payload);

      if (response?.result?.toLowerCase() === "success") {
        setSuccessMessage(response.message);

        setTimeout(() => {
          openClose(true);
        }, 1200);
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- UI ---------- */

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          openClose(false);
        }
      }}
    >
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto bg-gray-50 p-0">
        {/* ---------- HEADER ---------- */}

        <SheetHeader className="sticky top-0 z-10 bg-white border-b px-6 py-5 shadow-sm relative">
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => openClose(false)}
            className="absolute top-4 right-4 rounded-full p-2 hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <SheetTitle className="text-2xl font-bold text-gray-800">
            Update Lead
          </SheetTitle>

          <SheetDescription className="text-sm text-gray-500">
            Update lead information and documents
          </SheetDescription>
        </SheetHeader>

        {/* ---------- LOADER ---------- */}

        {loaderside && (
          <div className="flex justify-center items-center h-[400px]">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* ---------- FORM ---------- */}

        {!loaderside && (
          <div className="p-6 space-y-6">
            {/* MESSAGE ALERT */}

            {(errorMessage || successMessage) && (
              <div className="sticky top-20 z-20 animate-in slide-in-from-top duration-300">
                {errorMessage && (
                  <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-md">
                    <p className="text-sm font-medium text-red-600">
                      {errorMessage}
                    </p>
                  </div>
                )}

                {successMessage && (
                  <div className="mb-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 shadow-md">
                    <p className="text-sm font-medium text-green-600">
                      {successMessage}
                    </p>
                  </div>
                )}
              </div>
            )}
            {questions.map((q) => {
              const required = q.is_mandatory === "yes";

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                >
                  {/* LABEL */}

                  <label className={labelClass}>
                    {q.title}

                    {required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {/* SHORT ANSWER */}

                  {q.input_element_type === "short_answer" && (
                    <input
                      type="text"
                      className={inputClass}
                      value={formData[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}

                  {/* PARAGRAPH */}

                  {q.input_element_type === "paragraph" && (
                    <textarea
                      rows={4}
                      className={inputClass}
                      value={formData[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}

                  {/* RADIO */}

                  {q.input_element_type === "radio_button" && (
                    <div className="space-y-3 mt-3">
                      {q.preset_values?.map((opt: string) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 text-sm text-gray-700"
                        >
                          <input
                            type="radio"
                            name={q.id}
                            value={opt}
                            checked={formData[q.id] === opt}
                            onChange={() => handleChange(q.id, opt)}
                            className="w-4 h-4 accent-blue-600"
                          />

                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {/* CHECKBOX */}

                  {q.input_element_type === "checkboxes" && (
                    <div className="space-y-3 mt-3">
                      {q.preset_values?.map((opt: string) => (
                        <label
                          key={opt}
                          className="flex items-center gap-3 text-sm text-gray-700"
                        >
                          <input
                            type="checkbox"
                            checked={(formData[q.id] || []).includes(opt)}
                            onChange={() => handleCheckboxChange(q.id, opt)}
                            className="w-4 h-4 accent-blue-600"
                          />

                          {opt}
                        </label>
                      ))}
                    </div>
                  )}

                  {/* DROPDOWN */}

                  {q.input_element_type === "dropdown" && (
                    <select
                      className={`${inputClass} mt-1`}
                      value={formData[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    >
                      <option value="">Select</option>

                      {q.preset_values?.map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {/* DATE */}

                  {q.input_element_type === "date" && (
                    <input
                      type="date"
                      className={inputClass}
                      value={formData[q.id] || ""}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                    />
                  )}

                  {/* FILE */}

                  {q.input_element_type === "file_upload" && (
                    <div className="space-y-3">
                      <div className="relative">
                        <input
                          key={fileInputKey[q.id] || 0}
                          type="file"
                          className="hidden"
                          id={q.id}
                          onChange={(e) =>
                            e.target.files &&
                            handleFileChange(q.id, e.target.files[0])
                          }
                        />

                        <label
                          htmlFor={q.id}
                          className="flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl p-5 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition"
                        >
                          <Upload className="w-5 h-5 text-blue-600" />

                          <span className="text-sm text-gray-600">
                            Upload File
                          </span>
                        </label>
                      </div>

                      {/* EXISTING */}

                      {q.answered && (
                        <div className="text-sm text-green-600 font-medium">
                          ✔ File already uploaded
                        </div>
                      )}

                      {/* NEW FILE */}

                      {files.find((f) => f.id === q.id) && (
                        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-3 py-2">
                          <span className="text-sm text-gray-700 truncate">
                            {files.find((f) => f.id === q.id)?.file.name}
                          </span>

                          <button
                            type="button"
                            onClick={() => handleFileRemove(q.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* ---------- SUBMIT ---------- */}

            <div className="sticky bottom-0 bg-gray-50 pt-4 pb-2">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm"
              >
                {loading ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  "Update Lead"
                )}
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SchoolSheet;
