import { useEffect } from "react";
import { JustifyCenter, JustifyEnd } from "../../styles/FlexBoxStlye";
import { Button, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUpWideShort,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearFilter,
  setFilter,
  setPublic,
  setSolved,
} from "../../store/Toggle/MyErrorFilter";
import { RootState } from "../../store";
import { CheckBoxInput, CheckBoxLabel } from "../../styles/UtilityElements";

function MyErrorMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sortFilter = useSelector((state: RootState) => state.myErrorFilter);

  const handleFilterClick = (sort: string) => {
    dispatch(setFilter(sort));
  };

  const handleCheckBoxClick = (checkType: string) => {
    dispatch(
      checkType === "isPublic"
        ? setPublic(!sortFilter.isPublic)
        : setSolved(!sortFilter.isSolved)
    );
  };

  useEffect(() => {
    dispatch(clearFilter());
  }, []);

  return (
    <>
      <JustifyEnd style={{ marginTop: "1em" }}>
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
            <>
              <CheckBoxInput
                type="checkbox"
                id="solved"
                checked={sortFilter?.isSolved}
                onChange={(e) => handleCheckBoxClick("isSolved")}
              />
              <CheckBoxLabel htmlFor="solved">해결글만 표시</CheckBoxLabel>
            </>
            <>
              <CheckBoxInput
                type="checkbox"
                id="public"
                checked={sortFilter?.isPublic}
                onChange={() => handleCheckBoxClick("isPublic")}
              />
              <CheckBoxLabel htmlFor="public">공개글만 표시</CheckBoxLabel>
            </>

            <Dropdown.Toggle
              variant="outline-primary"
              id="dropdown-custom-components"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "1em",
              }}>
              <JustifyCenter>
                <p style={{ margin: 0, fontWeight: "600" }}>
                  {sortFilter?.filter}
                </p>
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
            <Dropdown.Menu style={{ textAlign: "center" }}>
              <Dropdown.Item onClick={() => handleFilterClick("최신순")}>
                최신순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterClick("오래된순")}>
                오래된순
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleFilterClick("인기순")}>
                인기순
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleFilterClick("높은 조회수부터")}>
                높은 조회수
              </Dropdown.Item>
            </Dropdown.Menu>
          </div>
        </Dropdown>
      </JustifyEnd>
    </>
  );
}

export default MyErrorMenu;
