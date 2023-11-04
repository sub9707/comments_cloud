import Popover from "react-bootstrap/Popover";

export default function PopoverCard(bodyText: string) {
  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">정보</Popover.Header>
      <Popover.Body>{bodyText}</Popover.Body>
    </Popover>
  );
}
