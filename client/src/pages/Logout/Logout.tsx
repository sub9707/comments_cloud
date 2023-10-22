import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { DELETE_TOKEN } from "../../store/Auth";
import { removeCookieToken } from "../../store/Cookie";
import { persistor } from "../../store";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    dispatch(DELETE_TOKEN());
    removeCookieToken();
    await persistor.purge();
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
