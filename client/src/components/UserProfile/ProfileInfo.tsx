import { useEffect, useState } from "react";
import styled from "styled-components";
import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import LevelBadge from "@components/Badges/LevelBadge";
import {
  InfoText,
  ProfileCircle,
  ProfileImgArea,
  ProfileInfoArea,
} from "@styles/PageContainer";
import { getUserInfo, getUserNoteData } from "@api/user";
import { UserInfoType, noteCountData } from "@/types/users";

function ProfileInfo(props: { userId: string }) {
  const { userId } = props;
  const [userInfo, setUserInfo] = useState<UserInfoType>();
  const [noteCountData, setNoteCountData] = useState<noteCountData>();

  const fetchUserData = async (userId: string) => {
    try {
      const data = await getUserInfo(userId);
      setUserInfo(data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getfetchNoteData = async () => {
    try {
      const result = await getUserNoteData(userId || "");
      setNoteCountData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserData(userId);
    getfetchNoteData();
  }, [userId]);

  return (
    <>
      <ProfileImgArea>
        <ProfileCircle src={`${userInfo?.profileImg}`} alt="프로필 이미지" />
      </ProfileImgArea>
      <ProfileInfoArea>
        <Nickname>{userInfo?.nickname}</Nickname>
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
        <InfoText>총 에러노트 수: {noteCountData?.TotalNoteCount}</InfoText>
        <InfoText>해결된 에러 수: {noteCountData?.TotalSolvedCount}</InfoText>
        <InfoText>총 받은 추천 수: {noteCountData?.TotalLikedCount}</InfoText>
        <InfoText>{userInfo?.registerDate} 가입</InfoText>
        <br />
        <MessageArea>
          {userInfo?.profile_message
            ? "프로필 메시지를 입력해주세요."
            : userInfo?.profile_message}
        </MessageArea>
      </ProfileInfoArea>{" "}
    </>
  );
}

export default ProfileInfo;

const renderTooltip = (props: any) => (
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
  padding: 1em;
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
