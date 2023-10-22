import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use

import {
  LogBox,
  PageActualWrapper,
  PageAreaDesign,
  PageContainer,
  ToolWrapper,
} from "../PageContainer";
import { useSelector } from "react-redux";
import { userStateType } from "../../store/User";

export default function MainPage() {
  const user = useSelector((state: userStateType) => state.user.data);
  console.log(user);
  return (
    <PageContainer>
      <PageActualWrapper>
        <PageAreaDesign>
          <ToolWrapper>
            <p>{user.name}님</p>
            <LogBox>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                size="1x"
                style={{ marginTop: "0.3em", marginRight: "0.3em" }}
              />
              <p>로그아웃</p>
            </LogBox>
          </ToolWrapper>
        </PageAreaDesign>
      </PageActualWrapper>
    </PageContainer>
  );
}
