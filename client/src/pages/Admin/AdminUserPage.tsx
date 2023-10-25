import { PageBox, PageHeader, UserTableBox } from "../../styles/AdminPageStyle";
import UserTable from "../../components/Table/UserTable";
import PaginationComp from "../../components/Pagination";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { UserData } from "../../types/users";

export default function AdminUserPage() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  // pagenation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  // userFetching
  const fetchData = async () => {
    try {
      const response = await axios.get("/users");
      setData(response.data);
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
      <UserTableBox>
        <UserTable data={data} />
        <br />
        <PaginationComp />
      </UserTableBox>
    </PageBox>
  );
}
