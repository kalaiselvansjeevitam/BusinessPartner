import { useState } from "react";
import Layout from "../../app/components/Layout/Layout";
import { Button } from "../../app/components/ui/button";
import { Input } from "../../app/components/ui/input";

const steps = [
  "Personal Information",
  "Contact Information",
  "Professional Information",
  "Payment Information",
  "Identity Verification",
];
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

export const ProfilePage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Field label="Full Name">
              <Input placeholder="Enter full name" />
            </Field>

            <Field label="Date of Birth">
              <Input type="date" />
            </Field>

            <Field label="Gender">
              <Input placeholder="Male / Female / Other" />
            </Field>

            <Field label="Profile Photo">
              <Input type="file" />
            </Field>
          </>
        );

      case 1:
        return (
          <>
            <Field label="Email">
              <Input type="email" placeholder="example@mail.com" />
            </Field>

            <Field label="Mobile Number">
              <Input placeholder="Enter mobile number" />
            </Field>

            <Field label="Address">
              <Input placeholder="Enter address" />
            </Field>

            <Field label="City">
              <Input placeholder="City" />
            </Field>

            <Field label="State">
              <Input placeholder="State" />
            </Field>

            <Field label="Pincode">
              <Input placeholder="Pincode" />
            </Field>
          </>
        );

      case 2:
        return (
          <>
            <Field label="Qualification">
              <Input placeholder="Degree / Diploma" />
            </Field>

            <Field label="Occupation">
              <Input placeholder="Occupation" />
            </Field>

            <Field label="Experience">
              <Input placeholder="Years of experience" />
            </Field>
          </>
        );

      case 3:
        return (
          <>
            <Field label="Bank Account Number">
              <Input placeholder="Account Number" />
            </Field>

            <Field label="IFSC Code">
              <Input placeholder="IFSC Code" />
            </Field>

            <Field label="Account Holder Name">
              <Input placeholder="Account holder name" />
            </Field>
          </>
        );

      case 4:
        return (
          <>
            <Field label="PAN Number">
              <Input placeholder="PAN Number" />
            </Field>

            <Field label="Aadhaar Number">
              <Input placeholder="Aadhaar Number" />
            </Field>

            <Field label="Upload PAN Card">
              <Input type="file" />
            </Field>

            <Field label="Upload Aadhaar Card">
              <Input type="file" />
            </Field>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Layout headerTitle="Profile">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-sm">
        {/* Step Header */}
        <h2 className="text-xl font-semibold mb-6">{steps[currentStep]}</h2>

        {/* Step Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            disabled={currentStep === 0}
            onClick={prevStep}
          >
            Previous
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button className="bg-purple text-white">Update Profile</Button>
          ) : (
            <Button onClick={nextStep} className="bg-purple text-white">
              Next
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
