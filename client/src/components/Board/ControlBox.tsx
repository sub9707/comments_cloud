import { useEffect, useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  clearFetchTab,
  setPopular,
  setRecent,
  setView,
} from "../../store/Toggle/BoardFetchTab";

function ControlBox() {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "최신순", value: "1" },
    { name: "인기순", value: "2" },
    { name: "조회순", value: "3" },
  ];

  const handleChange = (value: string) => {
    setRadioValue(value);
    switch (value) {
      case "1":
        dispatch(setRecent());
        break;
      case "2":
        dispatch(setPopular());
        break;
      case "3":
        dispatch(setView());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(clearFetchTab());
  }, []);

  return (
    <ButtonGroup style={{ marginRight: "5em" }}>
      {radios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          type="radio"
          variant={idx % 2 ? "outline-primary" : "outline-primary"}
          name="radio"
          value={radio.value}
          checked={radioValue === radio.value}
          onChange={() => handleChange(radio.value)}>
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export default ControlBox;
