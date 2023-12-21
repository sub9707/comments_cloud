import { Accordion } from "react-bootstrap";
import { NoticeTableProps } from "../../types/TableTypes";
import { JustifyAround, JustifyBetween } from "../../styles/FlexBoxStlye";
import { DottedDivision } from "../../styles/UtilityElements";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function BoardTable(props: NoticeTableProps) {
  return (
    <>
      {props.data.map((data, _idx) => (
        <Accordion alwaysOpen style={{ width: "100%" }} key={_idx}>
          <Accordion.Item eventKey={_idx.toString()}>
            <Accordion.Header>
              <JustifyBetween>
                <p style={{ marginBlock: 0, marginInline: "2em" }}>
                  <strong>#{_idx + 1}</strong> &nbsp; {data?.title}
                </p>
                <p
                  style={{ marginBlock: 0, marginInline: "2em", opacity: 0.7 }}>
                  {data?.createDate}
                </p>
              </JustifyBetween>
            </Accordion.Header>
            <Accordion.Body>
              <div dangerouslySetInnerHTML={{ __html: data?.content }} />
              <br />
              <DottedDivision />
              <AttatchedBox>
                <AttatchHeader>
                  <p>첨부파일&nbsp;</p>
                  <FontAwesomeIcon icon={faPaperclip} size="1x" />
                </AttatchHeader>
                <AttatchFiles>
                  {JSON.parse(data?.img_url).map(
                    (url: string, _idx: number) => (
                      <p key={_idx}>{url}</p>
                    )
                  )}
                </AttatchFiles>
              </AttatchedBox>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </>
  );
}

const AttatchedBox = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin-top: 1em;
`;
const AttatchHeader = styled.div`
  width: 13%;
  min-height: 5vh;
  height: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  p {
    margin: 0;
  }
`;
const AttatchFiles = styled.div`
  width: 87%;
  min-height: 5vh;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-inline: 1.5em;
  p {
    margin: 0;
    opacity: 0.7;
  }
`;
