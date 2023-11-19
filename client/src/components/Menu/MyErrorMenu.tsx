import { JustifyBetween, JustifyCenter } from "../../styles/FlexBoxStlye";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function MyErrorMenu() {
  const navigate = useNavigate();

  const handleRouteWrite = () => {
    navigate("/errorWrite");
  };
  return (
    <>
      <JustifyBetween style={{ marginTop: "1em" }}>
        <div>
          <Button
            style={{ marginLeft: "1em" }}
            variant="primary"
            onClick={handleRouteWrite}>
            새 글 작성
          </Button>
        </div>
        <Dropdown>
          <div style={{ display: "flex" }}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              size="xl"
              style={{
                opacity: 0.4,
                width: "2em",
                marginTop: "0.4em",
                cursor: "pointer",
              }}
              onClick={() => navigate("/myError/search")}
            />
            <Dropdown.Toggle
              variant="outline-primary"
              id="dropdown-custom-components"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <JustifyCenter>
                <p style={{ margin: 0, fontWeight: "600" }}>최신순</p>
                <FontAwesomeIcon
                  icon={faArrowUpWideShort}
                  size="lg"
                  style={{
                    opacity: 0.4,
                    width: "2em",
                    marginTop: "0.2em",
                    cursor: "pointer",
                  }}
                />
              </JustifyCenter>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </div>
        </Dropdown>
      </JustifyBetween>
    </>
  );
}

export default MyErrorMenu;
