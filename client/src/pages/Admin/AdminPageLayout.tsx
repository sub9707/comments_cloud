import { Outlet, useNavigate } from "react-router-dom";
import AdminNav from "@components/Admin/AdminNav";
import {
  Page1440Container,
  Page1920Container,
  PageContainer,
} from "@styles/AdminPageStyle";
import { useSelector } from "react-redux";
import { userStateType } from "@/store/Utils/User";
import { useEffect } from "react";

export default function AdminPageLayout() {
  const user = useSelector((state: userStateType) => state.user.data);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.rule !== "관리자") {
      navigate("/unauthorized");
    }
  }, []);
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
