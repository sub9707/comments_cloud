import Popover from "react-bootstrap/Popover";

type PopoverType = {
  headerText: string;
  bodyText: string;
};

export default function PopoverCard(props: PopoverType) {
  const { headerText, bodyText } = props;
  return (
    <Popover id="popover-basic" style={{ overflow: "hidden" }}>
      <Popover.Header as="h3">{headerText}</Popover.Header>
      <Popover.Body>{bodyText}</Popover.Body>
    </Popover>
  );
}
