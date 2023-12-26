import { useEffect, useState } from "react";
import AdminBoardTable from "@components/Table/AdminBoardTable";
import PaginationComp from "@components/Utils/Pagination";
import { PageBox, PageHeader, PageWrapper } from "@styles/AdminPageStyle";
import { BoardInfoFetchType } from "@/types/board";
import { getEntireBoards } from "@api/boards";

export default function AdminBoardPage() {
  const [data, setData] = useState<BoardInfoFetchType[]>([]);
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
  const fetchData = async () => {
    try {
      const response = await getEntireBoards();
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <PageBox>
      <PageHeader>게시글 관리 페이지</PageHeader>
      <PageWrapper>
        <AdminBoardTable data={currentItems} />
        <br />
        <PaginationComp
          active={currentPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </PageWrapper>
    </PageBox>
  );
}
