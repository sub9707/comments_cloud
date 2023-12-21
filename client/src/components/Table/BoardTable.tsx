import { Accordion } from "react-bootstrap";
import { NoticeTableProps, URLObjType } from "../../types/TableTypes";
import { JustifyBetween } from "../../styles/FlexBoxStlye";
import { DottedDivision } from "../../styles/UtilityElements";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPaperclip } from "@fortawesome/free-solid-svg-icons";

export default function BoardTable(props: NoticeTableProps) {
  const handleDownload = (url: string, fileName: string) => {
    fetch(url, { method: "GET" })
      .then((res) => {
        return res.blob();
      })
      .then((blob) => {
        const newUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = newUrl;
        a.download = `${fileName}`;
        document.body.appendChild(a);
        a.click();
        setTimeout((_: any) => {
          window.URL.revokeObjectURL(newUrl);
        }, 60000);
        a.remove();
      })
      .catch((error: Error) => {
        console.error("error: " + error);
      });
  };
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
            <Accordion.Body style={{ padding: "3em" }}>
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
                    (url: URLObjType, _idx: number) => (
                      <p
                        key={_idx}
                        className="text-underline-hover"
                        onClick={() =>
                          handleDownload(url?.fileURL, url?.fileName)
                        }>
                        <FontAwesomeIcon
                          icon={faFile}
                          style={{ marginRight: "0.5em" }}
                        />

                        {url?.fileName}
                      </p>
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
