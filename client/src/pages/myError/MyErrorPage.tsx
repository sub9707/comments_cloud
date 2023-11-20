import { ContentBox, MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";

import "react-toastify/dist/ReactToastify.css";
import MyErrorTable from "../../components/Table/MyErrorTable";
import MyErrorMenu from "../../components/Menu/MyErrorMenu";
import { JustifyBetween } from "../../styles/FlexBoxStlye";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isLoggedIn } from "../../store/Utils/Cookie";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/Modal/Modal";

export default function MyErrorPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRouteWrite = () => {
    navigate("/errorWrite");
  };
  useEffect(() => {
    if (!isLoggedIn()) {
      dispatch(openModal({ modalType: "NeedLoginModal", isOpen: true }));
      navigate("/");
    }
  }, []);
  return (
    <MainContainer>
      <JustifyBetween>
        <PageHeader>나의 에러 관리</PageHeader>
        <Button
          style={{ marginTop: "1em" }}
          variant="primary"
          onClick={handleRouteWrite}>
          새 글 작성
        </Button>
      </JustifyBetween>
      <MyErrorMenu />
      <ContentBox>
        <MyErrorTable />
      </ContentBox>
    </MainContainer>
  );
}
