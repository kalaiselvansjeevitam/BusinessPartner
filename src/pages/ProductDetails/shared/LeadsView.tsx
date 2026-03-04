import { useEffect, useState } from "react";
import Layout from "../../../app/components/Layout/Layout";
import TableComponent, {
  type Column,
} from "../../../app/components/shared/TableComponent";
import type { LeadList } from "../../../app/lib/types";
import { getViewLeads } from "../../../app/core/api/api.services";
import { useSearchParams } from "react-router-dom";
import { Loader } from "lucide-react";
// import type { LeadData } from "../../../app/lib/types"; // adjust path if needed

export const LeadsView = () => {
  const { mutateAsync: viewLeads } = getViewLeads();
  const [searchParams] = useSearchParams();
  const product_Id = searchParams.get("ID");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;
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
  ];

  return (
    <Layout headerTitle="View Leads">
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
    </Layout>
  );
};
