import { Outlet } from "react-router-dom";
import AdminNav from "../../components/Admin/AdminNav";
import {
  Page1440Container,
  Page1920Container,
  PageContainer,
} from "../../styles/AdminPageStyle";

export default function AdminPageLayout() {
  return (
    <PageContainer>
      <AdminNav />
      <Page1920Container>
        <Page1440Container>
          <Outlet />
        </Page1440Container>
      </Page1920Container>
    </PageContainer>
  );
}
