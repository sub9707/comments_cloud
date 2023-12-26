import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/store/Utils/Cookie";

function BannerLeft() {
  const navigate = useNavigate();
  const isLogIn = isLoggedIn();
  return (
    <BannerLeftBox>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: "1" }}>
        <MainTitleH1>
          바로 쓰고 관리하는 <br /> 내 손안의 에러노트
        </MainTitleH1>
      </motion.div>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: "1", delay: 0.3 }}>
        <SubTitleText>
          트러블슈터는 개발 중 발생한 에러와 오류들을 상황-원인-과정-결과로
          분류하여 작성하고, 이를 관리-공유할 수 있는 웹서비스입니다.
        </SubTitleText>
      </motion.div>
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: "1", delay: 0.5 }}>
        <ServiceButtonArea>
          <ServiceButton
            onClick={() => navigate(isLogIn ? `/myError` : `/login`)}>
            시작하기
          </ServiceButton>
          <ServiceInfoText>
            로그인하여 계정을 생성하고 <br /> 나만의 노트를 시작하세요!
          </ServiceInfoText>
        </ServiceButtonArea>
      </motion.div>
    </BannerLeftBox>
  );
}

export default BannerLeft;

const BannerLeftBox = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em;
  margin-left: 2em;
`;

const MainTitleH1 = styled.h1`
  font-family: ONE-Mobile-Title;
  font-weight: 700;
  color: #6b3fbd;
`;
const SubTitleText = styled.p`
  margin: 0;
  margin-top: 1em;
  color: #5528a7;
`;
const ServiceButtonArea = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 2em;
  align-items: center;
`;
export const ServiceButton = styled.button`
  background-color: #7528f1;
  width: 7em;
  height: 2.5em;
  border: none;
  color: white;
`;
const ServiceInfoText = styled.p`
  width: 21em;
  height: 3em;
  font-size: 0.9em;
  word-wrap: break-word;
  margin: 0;
  margin-left: 1em;
  color: #5528a7;
`;
