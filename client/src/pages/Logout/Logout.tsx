import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { DELETE_TOKEN } from "@/store/Utils/Auth";
import { removeCookieToken } from "@/store/Utils/Cookie";
import { persistor } from "@/store";
import { addMessage } from "@/store/Utils/Alert";
import { deleteAccessToken } from "@api/token";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    removeCookieToken();
    deleteAccessToken();
    await persistor.purge();
    dispatch(
      addMessage({
        id: "unique_id",
        text: `로그아웃했습니다.`,
        type: "info",
      })
    );
    return navigate("/");
  }

  useEffect(() => {
    logout();
  }, []);

  return (
    <>
      <Link to="/" />
    </>
  );
}
