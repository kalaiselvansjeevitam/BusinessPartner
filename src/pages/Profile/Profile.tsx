import { useEffect, useState } from "react";
import Layout from "../../app/components/Layout/Layout";
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";
import {
  getProfileDetails,
  getUpdateDetails,
} from "../../app/core/api/api.services";
import type { ProfileDetail } from "../../app/lib/types";
import { Loader } from "lucide-react";
import Swal from "sweetalert2";

interface FieldProps {
  label: string;
  children: React.ReactNode;
}

const Field: React.FC<FieldProps> = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-600">{label}</label>
    {children}
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold border-b pb-2">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);
const emptyProfile: ProfileDetail = {
  name: "",
  date_of_birth: "",
  gender: "",
  profile: "",
  phone_number: "",
  email_id: "",
  street_address: "",
  city: "",
  state_region_province: "",
  zip_code: "",
  qualification: "",
  occupation: "",
  experience: "",
  bank_account_number: "",
  ifsc_code: "",
  account_holder_name: "",
  pan_number: "",
  aadhaar_number: "",
};

export const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileDetail>(emptyProfile);
  const [loading, setLoading] = useState(false);
  const [submitloading, setSubmmitLoading] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const token = sessionStorage.getItem("session_token");
  const userId = sessionStorage.getItem("user_id");

  const { mutateAsync: fetchProfile } = getProfileDetails();
  const { mutateAsync: updateProfile } = getUpdateDetails();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);

        const res = await fetchProfile();
        if (res.result.toLowerCase() === "success") {
          setProfile(res.data);
          setImagePreview(res.data.profile);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [fetchProfile]);

  const handleSubmit = async () => {
    const formData = new FormData();
    const jsonData = {
      name: profile.name,
      date_of_birth: profile.date_of_birth,
      gender: profile.gender,
      phone_number: profile.phone_number,
      email_id: profile.email_id,
      street_address: profile.street_address,
      city: profile.city,
      state_region_province: profile.state_region_province,
      zip_code: profile.zip_code,
      qualification: profile.qualification,
      occupation: profile.occupation,
      experience: profile.experience,
      bank_account_number: profile.bank_account_number,
      ifsc_code: profile.ifsc_code,
      account_holder_name: profile.account_holder_name,
      pan_number: profile.pan_number,
      aadhaar_number: profile.aadhaar_number,
      user_id: userId,
      session_token: token,
    };
    formData.append("json_data", JSON.stringify(jsonData));
    if (profileImage) {
      formData.append("profile_image", profileImage);
    }
    try {
      setSubmmitLoading(true);
      const response = await updateProfile(formData);
      if (response.result.toLowerCase() == "success") {
        Swal.fire("Success", response?.message, "success");
      }
      setSubmmitLoading(false);
    } catch (error: any) {
      Swal.fire("Error", error?.response?.data?.message, "error");
      setSubmmitLoading(false);
    } finally {
      setSubmmitLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  return (
    <Layout headerTitle="Profile">
      {loading ? (
        <span className="flex items-center gap-2">
          <Loader className="w-4 h-4 animate-spin" />
          Loading
        </span>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm space-y-10">
          {/* Personal Information */}
          <Section title="Personal Information">
            <div className="md:col-span-2 flex items-center gap-6">
              <div className="relative">
                {/* Profile Image */}
                <div className="w-28 h-28 rounded-full overflow-hidden border">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Pencil Icon */}
                {!isEditingImage && (
                  <button
                    type="button"
                    onClick={() => setIsEditingImage(true)}
                    className="absolute bottom-1 right-1 bg-purple text-white p-1.5 rounded-full shadow hover:scale-105 transition"
                    aria-label="Edit profile picture"
                  >
                    ✏️
                  </button>
                )}
              </div>

              {/* Upload Input (shown only after click) */}
              {isEditingImage && (
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">
                    Upload new photo
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="max-w-xs"
                  />

                  <button
                    type="button"
                    onClick={() => setIsEditingImage(false)}
                    className="text-sm text-gray-500 mt-2 text-left"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <Field label="Full Name">
              <Input
                name="name"
                value={profile.name}
                onChange={handleChange}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </Field>

            <Field label="Date of Birth">
              <Input
                type="date"
                name="date_of_birth"
                value={profile.date_of_birth}
                onChange={handleChange}
              />
            </Field>

            <Field label="Gender">
              <Input
                name="gender"
                value={profile.gender}
                onChange={handleChange}
              />
            </Field>
          </Section>

          {/* Contact Information */}
          <Section title="Contact Information">
            <Field label="Email">
              <Input
                name="email_id"
                value={profile.email_id}
                onChange={handleChange}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </Field>

            <Field label="Mobile Number">
              <Input
                name="phone_number"
                value={profile.phone_number}
                onChange={handleChange}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </Field>

            <Field label="Address">
              <Input
                name="street_address"
                value={profile.street_address}
                onChange={handleChange}
              />
            </Field>

            <Field label="City">
              <Input name="city" value={profile.city} onChange={handleChange} />
            </Field>

            <Field label="State">
              <Input
                name="state_region_province"
                value={profile.state_region_province}
                onChange={handleChange}
              />
            </Field>

            <Field label="Pincode">
              <Input
                name="zip_code"
                value={profile.zip_code}
                onChange={handleChange}
              />
            </Field>
          </Section>

          {/* Professional Information */}
          <Section title="Professional Information">
            <Field label="Qualification">
              <Input
                name="qualification"
                value={profile.qualification}
                onChange={handleChange}
              />
            </Field>

            <Field label="Occupation">
              <Input
                name="occupation"
                value={profile.occupation}
                onChange={handleChange}
              />
            </Field>

            <Field label="Experience">
              <Input
                name="experience"
                value={profile.experience}
                onChange={handleChange}
              />
            </Field>
          </Section>

          {/* Payment Information */}
          <Section title="Payment Information">
            <Field label="Bank Account Number">
              <Input
                name="bank_account_number"
                value={profile.bank_account_number}
                onChange={handleChange}
              />
            </Field>

            <Field label="IFSC Code">
              <Input
                name="ifsc_code"
                value={profile.ifsc_code}
                onChange={handleChange}
              />
            </Field>

            <Field label="Account Holder Name">
              <Input
                name="account_holder_name"
                value={profile.account_holder_name}
                onChange={handleChange}
              />
            </Field>
          </Section>

          {/* Identity Verification */}
          <Section title="Identity Verification">
            <Field label="PAN Number">
              <Input
                name="pan_number"
                value={profile.pan_number}
                onChange={handleChange}
              />
            </Field>

            <Field label="Aadhaar Number">
              <Input
                name="aadhaar_number"
                value={profile.aadhaar_number}
                onChange={handleChange}
              />
            </Field>
          </Section>

          {/* Submit */}
          <div className="flex justify-end pt-6">
            <Button
              className="bg-purple text-white"
              onClick={handleSubmit}
              disabled={submitloading}
            >
              {submitloading ? (
                <div className=" flex justify-center">
                  <Loader className=" animate-spin" />
                </div>
              ) : (
                "Update Profile"
              )}
            </Button>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default ProfilePage;
