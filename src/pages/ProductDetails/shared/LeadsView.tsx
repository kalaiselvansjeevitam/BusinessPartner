import { useEffect, useState } from "react";
import Layout from "../../../app/components/Layout/Layout";
import TableComponent, {
  type Column,
} from "../../../app/components/shared/TableComponent";
import type { LeadList } from "../../../app/lib/types";
import { getViewLeads } from "../../../app/core/api/api.services";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";
import { Button } from "../../../app/components/ui/button";
import SchoolSheet from "./SchoolSheet";
// import type { LeadData } from "../../../app/lib/types"; // adjust path if needed

export const LeadsView = () => {
  const { mutateAsync: viewLeads } = getViewLeads();
  const [searchParams] = useSearchParams();
  const product_Id = searchParams.get("ID");
  const product_Name = searchParams.get("Product_Name");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const navigate = useNavigate();
  const [schoolSheetOpen, setSchoolSheetOpen] = useState(false);
  const getOffsetForPage = (page: number): number => {
    return page * itemsPerPage;
  };
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<LeadList[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = currentPage) => {
    try {
      setLoading(true);
      const offset = getOffsetForPage(page);
      const res = await viewLeads({
        offset: offset,
        product_id: product_Id!,
      });
      setData(res.data);
      setTotalCount(res.total_count);
    } catch (error) {
      console.error("Failed to fetch leads", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const columns: Column[] = [
    { key: "id", label: "ID", align: "left" },
    { key: "lead_name", label: "Lead Name", align: "center" },
    { key: "mobile_number", label: "Mobile Number", align: "left" },
    { key: "education_level", label: "Education Level", align: "left" },
    { key: "state", label: "State", align: "left" },
    { key: "created_at", label: "Created At", align: "center" },
    {
      key: "update",
      label: "Update",
      align: "center",
      render: (_value, row) => (
        <Button
          size="sm"
          onClick={() => {
            setSelectedProductId(row.id);
            setSchoolSheetOpen(true);
          }}
        >
          Update
        </Button>
      ),
    },
  ];

  return (
    <Layout headerTitle="View Leads">
      <div className="flex items-center justify-between px-4 mt-4">
        {/* LEFT SIDE */}
        <h2 className="text-xl font-bold text-gray-800">
          Product Name : {product_Name}
        </h2>

        {/* RIGHT SIDE */}
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
      <div className="mt-4 px-4">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <span className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              Loading...
            </span>
          </div>
        ) : (
          <TableComponent
            columns={columns}
            data={data}
            itemsPerPage={itemsPerPage}
            totalItems={totalCount}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
      <SchoolSheet
        open={schoolSheetOpen}
        workshopId={selectedProductId}
        openClose={(updated?: boolean) => {
          setSchoolSheetOpen(false);

          // optional refresh after update
          if (updated) {
            fetchData();
          }
        }}
      />
    </Layout>
  );
};
