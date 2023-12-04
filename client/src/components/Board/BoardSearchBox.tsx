import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, InputGroup } from "react-bootstrap";

function BoardSearchBox() {
  return (
    <InputGroup className="w-50">
      <Form.Control placeholder="검색어 입력..." />
      <Button variant="primary" id="button-addon2">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </Button>
    </InputGroup>
  );
}

export default BoardSearchBox;
