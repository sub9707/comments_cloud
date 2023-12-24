import { Outlet } from "react-router-dom";
import NavMenu from "../components/Utils/NavMenu";
import {
  PageActualWrapper,
  PageAreaDesign,
  PageContainer,
} from "../styles/PageContainer";
import AdminButton from "../components/Badges/AdminButton";
import { userStateType } from "../store/Utils/User";
import { useSelector } from "react-redux";
import ChatbotElement from "../components/Chatbot/ChatbotElement";

export default function PageLayout() {
  const user = useSelector((state: userStateType) => state.user.data);

  return (
    <PageContainer>
      {user?.rule === "관리자" && <AdminButton />}
      {/* <ChatbotElement /> */}
      <PageActualWrapper>
        <PageAreaDesign>
          <NavMenu />
          <Outlet />
        </PageAreaDesign>
      </PageActualWrapper>
    </PageContainer>
  );
}
