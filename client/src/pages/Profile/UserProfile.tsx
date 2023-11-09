import { useParams } from "react-router-dom";
import {
  InfoText,
  MainContainer,
  ProfileBox,
  ProfileCircle,
  ProfileImgArea,
  ProfileInfoArea,
  ProfileLeft,
  ProfileRight,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import LevelBadge from "../../components/Badges/LevelBadge";
import styled from "styled-components";

export default function UserProfile() {
  const { userId } = useParams();

  return (
    <MainContainer>
      <PageHeader>프로필</PageHeader>
      <ProfileBox>
        <ProfileLeft>
          <ProfileImgArea>
            <ProfileCircle
              src={`/images/Default_ProfileImg.png`}
              alt="프로필 이미지"
            />
          </ProfileImgArea>
          <ProfileInfoArea>
            <Nickname>닉네임</Nickname>
            <LevelBadge level={5} />
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}>
              <ProgressBar
                variant="primary"
                animated
                now={80}
                label="100,000 EXP"
                style={{
                  width: "85%",
                  marginBottom: "3em",
                  border: "2px solid white",
                  boxShadow:
                    "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
                }}
              />
            </OverlayTrigger>
            <InfoText>총 에러노트 수: 000</InfoText>
            <InfoText>해결된 에러 수: 000</InfoText>
            <InfoText>총 받은 추천 수: 000</InfoText>
            <InfoText>총 답변 수: 000</InfoText>
            <br />
            <MessageArea>
              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            </MessageArea>
          </ProfileInfoArea>
        </ProfileLeft>
        <ProfileRight>1</ProfileRight>
      </ProfileBox>
    </MainContainer>
  );
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    100,000 EXP (80%)
  </Tooltip>
);

const Nickname = styled.p`
  font-weight: 700;
  font-size: x-large;
`;

const MessageArea = styled.div`
  width: 90%;
  height: 6em;
  background-color: #f5f5f5;
  margin-bottom: 1em;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-all;
  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d6dee1;
    border-radius: 20px;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #a8bbbf;
  }
`;
