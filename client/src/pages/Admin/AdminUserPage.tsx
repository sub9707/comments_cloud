import { PageBox, PageHeader, PageWrapper } from "../../styles/AdminPageStyle";
import UserTable from "../../components/Table/UserTable";
import PaginationComp from "../../components/Utils/Pagination";
import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { UserData } from "../../types/users";
import { Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { JustifyCenter } from "../../styles/FlexBoxStlye";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function AdminUserPage() {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const itemsPerPage = 10;

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // User fetching
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
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
            <JustifyCenter>
              <InputGroup className="w-50">
                <Form.Control
                  placeholder="유저 검색"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </InputGroup>
            </JustifyCenter>
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
