import { useEffect } from "react";
import { JustifyCenter, JustifyEnd } from "@styles/FlexBoxStlye";
import { Dropdown } from "react-bootstrap";
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
  setPrivate,
  setPublic,
  setSolved,
  setUnsolved,
} from "@/store/Toggle/MyErrorFilter";
import { RootState } from "@/store";
import {
  CheckBoxInput,
  CheckBoxLabel,
  FilterButton,
} from "@styles/UtilityElements";

function MyErrorMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sortFilter = useSelector((state: RootState) => state.myErrorFilter);

  const handleFilterClick = (sort: string) => {
    dispatch(setFilter(sort));
  };

  const handleCheckBoxClick = (checkType: string) => {
    switch (checkType) {
      case "solvedOnly":
        dispatch(setSolved(true));
        break;
      case "unsolvendOnly":
        dispatch(setUnsolved(true));
        break;
      case "publicOnly":
        dispatch(setPublic(true));
        break;
      case "privateOnly":
        dispatch(setPrivate(true));
        break;

      default:
        break;
    }
  };
  const handleFilterClear = () => {
    dispatch(clearFilter());
    navigate(0);
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
                checked={sortFilter?.solvedOnly}
                onChange={() => handleCheckBoxClick("solvedOnly")}
              />
              <CheckBoxLabel htmlFor="solved">해결만 표시</CheckBoxLabel>
            </>
            <>
              <CheckBoxInput
                type="checkbox"
                id="unsolved"
                checked={sortFilter?.unsolvendOnly}
                onChange={() => handleCheckBoxClick("unsolvendOnly")}
              />
              <CheckBoxLabel htmlFor="unsolved">미해결만 표시</CheckBoxLabel>
            </>
            <>
              <CheckBoxInput
                type="checkbox"
                id="publicOnly"
                checked={sortFilter?.publicOnly}
                onChange={() => handleCheckBoxClick("publicOnly")}
              />
              <CheckBoxLabel htmlFor="publicOnly">공개만 표시</CheckBoxLabel>
            </>
            <>
              <CheckBoxInput
                type="checkbox"
                id="privateOnly"
                checked={sortFilter?.privateOnly}
                onChange={() => handleCheckBoxClick("privateOnly")}
              />
              <CheckBoxLabel htmlFor="privateOnly">미공개만 표시</CheckBoxLabel>
            </>
            <>
              <FilterButton
                type="button"
                id="public"
                onClick={handleFilterClear}
              />
              <CheckBoxLabel htmlFor="public">전체 표시</CheckBoxLabel>
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
