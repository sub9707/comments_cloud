import { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

function ControlBox() {
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "최신순", value: "1" },
    { name: "인기순", value: "2" },
    { name: "조회순", value: "3" },
  ];

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
          onChange={(e) => setRadioValue(e.currentTarget.value)}>
          {radio.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}

export default ControlBox;
