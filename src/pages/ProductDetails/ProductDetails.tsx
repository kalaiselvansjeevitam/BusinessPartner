import Layout from "../../app/components/Layout/Layout";
import { Button } from "../../app/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ROUTE_URL } from "../../app/core/constants/coreUrl";
import { getProductsList } from "../../app/core/api/api.services";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import type { Product } from "../../app/lib/types";

export const ProductDetails = () => {
  const { mutateAsync: productList } = getProductsList();
  // const [totalCount, setTotalCount] = useState(0);
  const [productData, setProductData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [imageStatus, setImageStatus] = useState<
    Record<string, "loading" | "loaded" | "error">
  >({});

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
    } catch (error) {
      console.error("Failed to fetch products", error);
      setProductData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout headerTitle="Product Details">
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader className="animate-spin w-6 h-6 text-blue-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {productData.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-4 rounded-2xl shadow-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:shadow-xl transition"
              >
                {/* Left - Logo */}
                <div className="w-20 h-20 flex items-center justify-center bg-white rounded-xl shadow relative overflow-hidden">
                  {/* Loader */}
                  {imageStatus[product.id] !== "loaded" &&
                    imageStatus[product.id] !== "error" && (
                      <Loader className="animate-spin w-5 h-5 text-blue-500 absolute" />
                    )}

                  {/* Image */}
                  {imageStatus[product.id] !== "error" && (
                    <img
                      src={product.product_logo_url}
                      alt={product.product_name}
                      className={`h-12 object-contain transition-opacity duration-300 ${
                        imageStatus[product.id] === "loaded"
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                      onLoad={() =>
                        setImageStatus((prev) => ({
                          ...prev,
                          [product.id]: "loaded",
                        }))
                      }
                      onError={(e) => {
                        // stop further loading attempts
                        e.currentTarget.onerror = null;

                        setImageStatus((prev) => ({
                          ...prev,
                          [product.id]: "error",
                        }));
                      }}
                    />
                  )}

                  {/* Fallback UI */}
                  {imageStatus[product.id] === "error" && (
                    <div className="flex items-center justify-center h-full w-full text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                {/* Right - Details */}
                <div className="flex-1">
                  <h2 className="text-md font-semibold text-gray-800 mb-1">
                    {product.product_name}
                  </h2>

                  <p className="text-sm text-gray-600 mb-3">
                    Payout:{" "}
                    <span className="font-semibold text-blue-700">
                      {product.payout}
                    </span>
                  </p>

                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() =>
                      navigate(
                        `${ROUTE_URL.productView}?ID=${product.id}&Product_Name=${product.product_name}`,
                      )
                    }
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
