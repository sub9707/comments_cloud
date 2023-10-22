import { Link } from "react-router-dom";
import { LogBox, ToolWrapper } from "../pages/PageContainer";
import { isLoggedIn } from "../store/Cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { userStateType } from "../store/User";

export default function NavMenu() {
  const user = useSelector((state: userStateType) => state.user.data);
  console.log(user);
  return (
    <ToolWrapper>
      <LogBox>
        {isLoggedIn() ? (
          <>
            <p>{user.name}님</p>
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
