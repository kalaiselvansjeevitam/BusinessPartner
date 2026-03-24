import Layout from "../../../app/components/Layout/Layout";
import { Button } from "../../../app/components/ui/button";
import { Download, ArrowLeft, Loader } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getProductsDetail,
  getShowInterest,
} from "../../../app/core/api/api.services";
import { useEffect, useState } from "react";
import type { ProductDetail } from "../../../app/lib/types";
import { ROUTE_URL } from "../../../app/core/constants/coreUrl";
import Swal from "sweetalert2";

export const ProductView = () => {
  const { mutateAsync: productDetails } = getProductsDetail();
  const { mutateAsync: interest } = getShowInterest();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const product_Id = searchParams.get("ID");
  const userId = sessionStorage.getItem("user_id");
  const [productDetailsData, setProductDetailsData] =
    useState<ProductDetail | null>(null);
  const interestStatus =
    productDetailsData?.show_interest_status === "NULL"
      ? null
      : productDetailsData?.show_interest_status;
  const [loading, setLoading] = useState(false);
  const [loadinginterest, setLoadinginterest] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await productDetails({
        product_id: product_Id ?? "",
      });

      // 👇 TAKE FIRST ITEM
      setProductDetailsData(res.data?.[0] ?? null);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProductDetailsData(null);
    } finally {
      setLoading(false);
    }
  };
  const handleInterest = async () => {
    try {
      setLoadinginterest(true);

      const response = await interest({
        product_id: product_Id ?? "",
        partner_id: userId ?? "",
      });

      await fetchData();
      if (response.result.toLowerCase() == "success") {
        Swal.fire("Success", response?.message, "success");
      }
    } catch (error: any) {
      Swal.fire("Error", error?.response?.data?.message, "error");

      console.error("Interest failed", error);
    } finally {
      setLoadinginterest(false);
    }
  };
  const handleProtectedAction = (type: "add" | "view") => {
    if (!interestStatus) {
      // NULL
      Swal.fire({
        icon: "warning",
        title: "Needs admin approval",
        text: 'Please apply - "Show Interest"',
      });
      return;
    }

    if (interestStatus === "Applied") {
      Swal.fire({
        icon: "info",
        title: "Pending Approval",
        html: `Interest has been shown to the Admin.<br/>Kindly wait for approval.`,
      });
      return;
    }

    // Approved → allow navigation
    if (type === "add") {
      navigate(`${ROUTE_URL.addlead}?ID=${product_Id}`);
    } else {
      navigate(`${ROUTE_URL.leadsView}?ID=${product_Id}`);
    }
  };

  return (
    <Layout headerTitle="View Product">
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <span className="flex items-center gap-2">
            <Loader className="w-4 h-4 animate-spin" />
            Loading...
          </span>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
          {/* Back Button */}
          <div className="flex justify-between items-center mb-4">
            {/* Left - Actions */}
            <div className="flex items-center gap-3">
              {/* ================= SHOW INTEREST ================= */}
              {interestStatus === null && (
                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                  disabled={loadinginterest}
                  onClick={handleInterest}
                >
                  {loadinginterest ? (
                    <span className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    "Show Interest"
                  )}
                </Button>
              )}

              {/* ================= ADD LEADS ================= */}
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleProtectedAction("add")}
              >
                Add Leads
              </Button>

              {/* ================= VIEW LEADS ================= */}
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleProtectedAction("view")}
              >
                View Leads
              </Button>
            </div>

            {/* Right - Back Button */}
            <Button
              onClick={() => navigate(-1)}
              type="button"
              variant="outline"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
          </div>

          <Section title="Primary Details">
            {productDetailsData ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900">
                  {productDetailsData.product_name}
                </h2>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>
                    <b>Category:</b> {productDetailsData.category}
                  </span>
                  <span>
                    <b>Payout:</b> {productDetailsData.payout}
                  </span>
                  <span>
                    <b>Status:</b> {productDetailsData.status}
                  </span>
                </div>

                <p className="mt-4 text-gray-700">
                  {productDetailsData.description}
                </p>
              </>
            ) : (
              <p className="text-gray-400">No primary details available.</p>
            )}
          </Section>

          {/* Orientation */}
          <Section title="Orientation">
            {productDetailsData ? (
              <p className="text-gray-600 leading-relaxed">
                {productDetailsData.orientation_content}
              </p>
            ) : (
              <p className="text-gray-400">No orientation content available.</p>
            )}
          </Section>

          {/* Text Content */}
          <Section
            title={productDetailsData?.text_content_title || "Text Content"}
          >
            {productDetailsData ? (
              <p className="text-gray-600 leading-relaxed">
                {productDetailsData.text_content}
              </p>
            ) : (
              <p className="text-gray-400">No text content available.</p>
            )}
          </Section>

          {/* Marketing Resources */}
          <Section title="Marketing Resources">
            <div className="space-y-3">
              {productDetailsData && (
                <>
                  <ResourceItem
                    label="Posters"
                    url={productDetailsData.poster_url}
                    onDownload={handleDownload}
                  />

                  <ResourceItem
                    label="Brochures"
                    url={productDetailsData.brochure_url}
                    onDownload={handleDownload}
                  />

                  <ResourceItem
                    label="WhatsApp Templates"
                    url={productDetailsData.whatsapp_template_url}
                    onDownload={handleDownload}
                  />
                </>
              )}
            </div>
          </Section>

          {/* Rules */}
          <Section title="Rules">
            {productDetailsData ? (
              <RuleItem
                title="Lead Rules"
                description={productDetailsData.lead_rules}
              />
            ) : (
              <p className="text-gray-400">No rules available.</p>
            )}
          </Section>
        </div>
      )}
    </Layout>
  );
};
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

const handleDownload = (url: string) => {
  if (!url) return;

  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = "";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Resource items with download button
const ResourceItem = ({
  label,
  url,
  onDownload,
}: {
  label: string;
  url: string;
  onDownload: (url: string) => void;
}) => (
  <div className="flex items-center justify-between border rounded-lg p-3">
    <span className="text-gray-700">{label}</span>
    <Button
      variant="outline"
      size="sm"
      onClick={() => onDownload(url)}
      disabled={!url}
    >
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

export default ProductView;
