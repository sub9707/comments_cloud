import { AccordionDate } from "../../styles/TextStyle";
import { Accordion } from "react-bootstrap";
import { NoticeTableProps } from "../../types/TableTypes";

export default function BoardTable(props: NoticeTableProps) {
  return (
    <>
      {props.data.map((data, _idx) => (
        <Accordion alwaysOpen style={{ width: "100%" }} key={_idx}>
          <Accordion.Item eventKey={_idx.toString()}>
            <Accordion.Header>
              #{_idx} {data?.title}
            </Accordion.Header>
            <Accordion.Body>
              <AccordionDate>작성일자 : {data?.createDate}</AccordionDate>
              <div dangerouslySetInnerHTML={{ __html: data?.content }} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
}
