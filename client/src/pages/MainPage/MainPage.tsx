import NavMenu from "../../components/NavMenu";
import {
  PageActualWrapper,
  PageAreaDesign,
  PageContainer,
} from "../PageContainer";

export default function MainPage() {
  return (
    <PageContainer>
      <PageActualWrapper>
        <PageAreaDesign>
          <NavMenu />
        </PageAreaDesign>
      </PageActualWrapper>
    </PageContainer>
  );
}
