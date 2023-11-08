import { useParams } from "react-router-dom";
import {
  InfoText,
  MainContainer,
  ProfileBox,
  ProfileChangeButton,
  ProfileCircle,
  ProfileImgArea,
  ProfileInfoArea,
  ProfileLeft,
  ProfileRight,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import LevelBadge from "../../components/Badges/LevelBadge";

export default function UserProfileFix() {
  const { userId } = useParams();

  return (
    <MainContainer>
      <PageHeader>프로필 수정</PageHeader>
      <ProfileBox>
        <ProfileLeft>
          <ProfileImgArea>
            <ProfileCircle
              src={`/images/Default_ProfileImg.png`}
              alt="프로필 이미지"
            />
            <ProfileChangeButton htmlFor="file">
              <FontAwesomeIcon
                icon={faPlus}
                style={{ color: "white" }}
                size="2x"
              />
              <input
                type="file"
                name="file"
                id="file"
                style={{ display: "none" }}
              />
            </ProfileChangeButton>
          </ProfileImgArea>
          <ProfileInfoArea>
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
            <LevelBadge level={5} />
            <InfoText>총 에러노트 수: 000</InfoText>
            <InfoText>해결된 에러 수: 000</InfoText>
            <InfoText>총 받은 추천 수: 000</InfoText>
            <InfoText>총 답변 수: 000</InfoText>
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
