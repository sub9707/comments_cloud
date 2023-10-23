import { Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import {
  PageActualWrapper,
  PageAreaDesign,
  PageContainer,
} from "./PageContainer";

export default function PageLayout() {
  return (
    <PageContainer>
      <PageActualWrapper>
        <PageAreaDesign>
          <NavMenu />
          <Outlet />
        </PageAreaDesign>
      </PageActualWrapper>
    </PageContainer>
  );
}
