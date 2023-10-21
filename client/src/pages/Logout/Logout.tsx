import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { DELETE_TOKEN } from "../../store/Auth";
import { removeCookieToken } from "../../store/Cookie";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    dispatch(DELETE_TOKEN());
    removeCookieToken();
    return navigate("/");
  }

  useEffect(() => {
    alert("로그아웃");
    logout();
  }, []);

  return (
    <>
      <Link to="/login" />
    </>
  );
}
