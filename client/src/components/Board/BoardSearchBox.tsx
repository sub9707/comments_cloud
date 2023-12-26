import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  clearBoardSearch,
  setSearch,
} from "@/store/DataThunk/BoardSearchSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { clearPagination } from "@/store/Utils/Pagination";
import { useNavigate } from "react-router-dom";

function BoardSearchBox() {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      dispatch(clearPagination());
      dispatch(setSearch(searchValue));
    } catch (error) {
      console.error(error);
    } finally {
      navigate(`/board/search`);
    }
  };
  useEffect(() => {
    dispatch(clearBoardSearch());
  }, []);
  return (
    <InputGroup className="w-50">
      <Form.Control
        placeholder="검색어 입력..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button variant="primary" id="button-addon2" onClick={handleClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </InputGroup>
  );
}

export default BoardSearchBox;
