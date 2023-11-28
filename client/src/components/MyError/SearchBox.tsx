import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

function SearchBox() {
  return (
    <InputGroup className="mb-3 w-75">
      <Form.Control placeholder="검색어 입력.." />
      <Button variant="primary" id="button-addon2">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </InputGroup>
  );
}

export default SearchBox;
