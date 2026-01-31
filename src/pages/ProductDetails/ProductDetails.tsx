import Layout from "../../app/components/Layout/Layout";
import TableComponent, {
  type Column,
} from "../../app/components/shared/TableComponent";
import { Button } from "../../app/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "../../app/core/constants/coreUrl";

const productData = [
  {
    id: 1,
    name: "Credit Card",
    description: "Apply for premium credit cards",
    commission: "5%",
    status: "Active",
  },
  {
    id: 2,
    name: "Personal Loan",
    description: "Instant personal loan offers",
    commission: "3%",
    status: "Inactive",
  },
];

export const ProductDetails = () => {
  const navigate = useNavigate();

  const columns: Column[] = [
    { key: "name", label: "Product Name" },
    { key: "description", label: "Short Description" },
    { key: "commission", label: "Commission %" },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "addLeads",
      label: "Add Leads",
      render: (_,) => (
        <Button
          size="sm"
          onClick={() => navigate(`${ROUTE_URL.addlead}`)}
        >
          Add Lead
        </Button>
      ),
    },
    {
      key: "view",
      label: "View",
      render: (_) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`${ROUTE_URL.productView}`)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <Layout headerTitle="Product Details">
      <div className="p-6">
        <TableComponent columns={columns} data={productData} />
      </div>
    </Layout>
  );
};

export default ProductDetails;
