import { Link, useNavigate } from "react-router-dom";
import { LogBox, PageNavBox, ToolWrapper } from "../../styles/PageContainer";
import { isLoggedIn } from "../../store/Utils/Cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faLeftLong,
  faPowerOff,
  faRightFromBracket,
  faRightLong,
  faScrewdriverWrench,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { userStateType } from "../../store/Utils/User";

export default function NavMenu() {
  const user = useSelector((state: userStateType) => state.user.data);
  const navigate = useNavigate();
  const handleAdminClick = () => {
    navigate("/admin");
  };
  const handleProfileClick = () => {
    const userPersist = localStorage.getItem("persist:root");
    const parsedUserPersist = JSON.parse(userPersist || "");

    if (parsedUserPersist && parsedUserPersist.user) {
      const userData = JSON.parse(parsedUserPersist.user);

      if (userData && userData.data && userData.data.id) {
        const userId = userData.data.id;
        navigate(`/user/${userId}`);
      } else {
        console.error("로컬스토리지에 유저 정보가 없습니다.");
      }
    } else {
      console.error("로컬스토리지에 유저 정보가 없습니다.");
    }
  };
  return (
    <ToolWrapper>
      <PageNavBox>
        <FontAwesomeIcon
          icon={faLeftLong}
          size="2x"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(-1)}
        />
        <FontAwesomeIcon
          icon={faHouse}
          size="xl"
          style={{ cursor: "pointer", marginTop: "2%", marginInline: "5%" }}
          onClick={() => navigate("/")}
        />
        <FontAwesomeIcon
          icon={faRightLong}
          size="2x"
          style={{ cursor: "pointer" }}
          onClick={() => navigate(1)}
        />
      </PageNavBox>

      <LogBox>
        {isLoggedIn() ? (
          <>
            <p style={{ cursor: "pointer" }} onClick={handleProfileClick}>
              {user.name}님
            </p>
            <Link
              to={"/logout"}
              style={{
                display: "flex",
                color: "white",
                marginLeft: "1em",
              }}>
              <FontAwesomeIcon
                icon={faPowerOff}
                size="1x"
                style={{ marginTop: "0.3em", marginRight: "0.3em" }}
              />
              <p>로그아웃</p>
            </Link>
          </>
        ) : (
          <Link to={"/login"} style={{ display: "flex", color: "white" }}>
            <FontAwesomeIcon
              icon={faRightFromBracket}
              size="1x"
              style={{ marginTop: "0.3em", marginRight: "0.3em" }}
            />
            <p>로그인</p>
          </Link>
        )}
      </LogBox>
    </ToolWrapper>
  );
}
