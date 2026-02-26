import Layout from "../../app/components/Layout/Layout";
import TableComponent, {
  type Column,
} from "../../app/components/shared/TableComponent";
import { Button } from "../../app/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "../../app/core/constants/coreUrl";
import { getProductsList, type Product } from "../../app/core/api/api.services";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";

export const ProductDetails = () => {
  const { mutateAsync: productList } = getProductsList();
  const [totalCount, setTotalCount] = useState(0);
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setOffset(0);

      const res = await productList({
        offset: offset.toString(),
      });

      setProductData(res?.data ?? []);
      setTotalCount(res.total_count);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProductData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column[] = [
    { key: "product_name", label: "Product Name" },
    { key: "description", label: "Short Description" },
    { key: "payout", label: "Payout" },
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
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => navigate(`${ROUTE_URL.addlead}`)}
        >
          Add Lead
        </Button>
      ),
    },
    {
      key: "viewleads",
      label: "View Leads",
      render: (_) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`${ROUTE_URL.leadsView}`)}
        >
          View Leads
        </Button>
      ),
    },
    {
      key: "viewdetails",
      label: "View Details",
      render: (_) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => navigate(`${ROUTE_URL.productView}`)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <Layout headerTitle="Product Details">
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader className="animate-spin w-6 h-6 text-blue-600" />
          </div>
        ) : (
          <TableComponent
            columns={columns}
            data={productData}
            totalItems={totalCount}
          />
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
