import Layout from "../../../app/components/Layout/Layout";
import { Button } from "../../../app/components/ui/button";
import { Download, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

// Card-style section wrapper
const Section = ({ title, children }: SectionProps) => (
  <div className="bg-white p-6 rounded-xl shadow-sm">
    <h3 className="text-lg font-semibold mb-4">{title}</h3>
    {children}
  </div>
);

// Resource items with download button
const ResourceItem = ({ label }: { label: string }) => (
  <div className="flex items-center justify-between border rounded-lg p-3">
    <span className="text-gray-700">{label}</span>
    <Button variant="outline" size="sm">
      <Download size={14} />
    </Button>
  </div>
);

// Rule items with description
const RuleItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div>
    <h4 className="font-medium text-gray-800">{title}</h4>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

export const ProductView = () => {
  const navigate = useNavigate();

  return (
    <Layout headerTitle="View Product">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <div className="flex justify-end">
          <button
            onClick={() => navigate(-1)}
            type="button"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-black bg-transparent"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>

        {/* Orientation */}
        <Section title="Orientation">
          <p className="text-gray-600 leading-relaxed">
            This orientation provides an overview of the product, its benefits,
            eligibility criteria, and how to pitch it effectively to customers.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Eligibility criteria for leads</li>
            <li>How to pitch the product effectively</li>
            <li>Important product highlights</li>
          </ul>
        </Section>

        {/* Text Content */}
        <Section title="Text Content">
          <p className="text-gray-600 leading-relaxed">
            Use this text content to explain the product features clearly to the
            customers and guide them through the onboarding process.
          </p>
        </Section>

        {/* Downloadable PPT */}
        <Section title="Downloadable PPT">
          <Button className="flex items-center gap-2">
            <Download size={16} />
            Download Training PPT
          </Button>
        </Section>

        {/* Training Videos */}
        <Section title="Training Videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <video className="w-full h-56 rounded-lg border" controls>
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
            </video>

            <video className="w-full h-56 rounded-lg border" controls>
              <source
                src="https://www.w3schools.com/html/movie.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </Section>

        {/* Marketing Resources */}
        <Section title="Marketing Resources">
          <div className="space-y-3">
            <ResourceItem label="Posters" />
            <ResourceItem label="Brochures" />
            <ResourceItem label="WhatsApp Templates" />
          </div>
        </Section>

        {/* Rules */}
        <Section title="Rules">
          <div className="space-y-4">
            <RuleItem
              title="Lead Eligibility Rules"
              description="Leads must be valid, complete, and meet the product eligibility criteria."
            />
            <RuleItem
              title="Commission Rules"
              description="Commission is credited only after successful lead conversion and verification."
            />
          </div>
        </Section>
      </div>
    </Layout>
  );
};

export default ProductView;
