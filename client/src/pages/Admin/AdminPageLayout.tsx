import { Outlet } from "react-router-dom";
import AdminNav from "../../components/AdminNav";
import { PageContainer } from "./AdminMain/AdminPageStyle";

export default function AdminPageLayout() {
  return (
    <PageContainer>
      <AdminNav />
      <Outlet />
    </PageContainer>
  );
}
