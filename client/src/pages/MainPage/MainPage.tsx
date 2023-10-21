import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use

import {
  LogBox,
  PageActualWrapper,
  PageAreaDesign,
  PageContainer,
  ToolWrapper,
} from "../PageContainer";

export default function MainPage() {
  return (
    <PageContainer>
      <PageActualWrapper>
        <PageAreaDesign>
          <ToolWrapper>
            <p>ooo님</p>
            <LogBox>
              <FontAwesomeIcon icon={faRightFromBracket} size="xl" />
              <p>로그아웃</p>
            </LogBox>
          </ToolWrapper>
        </PageAreaDesign>
      </PageActualWrapper>
    </PageContainer>
  );
}
