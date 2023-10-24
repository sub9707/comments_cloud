import { PageBox, PageHeader, UserTableBox } from "../../styles/AdminPageStyle";
import UserTable from "../../components/UserTable/UserTable";
import PaginationComp from "../../components/Pagination";

export default function AdminUserPage() {
  return (
    <PageBox>
      <PageHeader>유저페이지</PageHeader>
      <UserTableBox>
        <UserTable />
        <br />
        <PaginationComp />
      </UserTableBox>
    </PageBox>
  );
}
