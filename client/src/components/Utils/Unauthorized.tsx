import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}>
      <img
        style={{ width: "40%", height: "80vh" }}
        src="images/Unauthorized.png"
        alt="대체이미지"
      />
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          top: "70vh",
        }}>
        <h1 style={{ fontWeight: "700" }}>Unauthorized Access</h1>
        <h1>권한이 필요한 접근입니다.</h1>
        <br />
        <Button
          style={{ width: "10em", height: "3em", fontSize: "1.1em" }}
          onClick={() => navigate("/")}>
          홈으로
        </Button>
      </div>
    </div>
  );
}
