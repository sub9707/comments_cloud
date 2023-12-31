import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch, fetchSearchData } from "@/store/DataThunk/MySearchSlice";
import { userStateType } from "@/store/Utils/User";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { MyErrorSearchDataType } from "@/types/BoardTypes";

function SearchBox() {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const user = useSelector((state: userStateType) => state.user.data);
  const loading = useSelector((state: MyErrorSearchDataType) => state.loading);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    []
  );

  const handleButtonClick = () => {
    try {
      dispatch(
        fetchSearchData({ search: searchValue, offset: 0, userId: user?.id })
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(clearSearch());
  }, []);

  return (
    <InputGroup className="mb-3 w-75">
      <Form.Control
        placeholder="검색어 입력.."
        value={searchValue}
        onChange={handleInputChange}
      />
      <Button variant="primary" onClick={handleButtonClick} disabled={loading}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </InputGroup>
  );
}

export default SearchBox;
