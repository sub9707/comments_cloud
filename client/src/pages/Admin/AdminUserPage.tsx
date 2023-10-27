import { PageBox, PageHeader, PageWrapper } from "../../styles/AdminPageStyle";
import UserTable from "../../components/Table/UserTable";
import PaginationComp from "../../components/Pagination";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { UserData } from "../../types/users";
import { Spinner } from "react-bootstrap";

export default function AdminUserPage() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  // pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = Math.ceil(data.length / itemsPerPage);
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // userFetching
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/users");
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PageBox>
      <PageHeader>유저페이지</PageHeader>
      <PageWrapper>
        {loading ? (
          <Spinner animation="border" variant="secondary" />
        ) : (
          <>
            <UserTable data={currentItems} />
            <br />
            <PaginationComp
              active={currentPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </PageWrapper>
    </PageBox>
  );
}
