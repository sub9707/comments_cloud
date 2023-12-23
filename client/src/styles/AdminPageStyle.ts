import { Quill } from "react-quill";
import styled from "styled-components";
import { ImageResize } from "quill-image-resize-module-ts";
Quill.register("modules/ImageResize", ImageResize);

export const PageContainer = styled.div`
  margin: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #e4e4ef;
`;

export const Page1920Container = styled.div`
  max-width: 1920px;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;
`;

export const Page1440Container = styled.div`
  width: 100%;
  max-width: 1440px;
  min-height: 100vh;
  height: auto;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  display: flex;
  justify-content: center;
  padding-block: 3em;
`;

export const PageBox = styled.div`
  width: 90%;
  height: auto;
`;

export const PageHeader = styled.h1`
  font-size: 2em;
  color: gray;
  font-weight: 700;
  &::before {
    content: "|";
    color: rgb(94, 101, 202);
    margin-right: 0.5em;
    opacity: 0.8;
  }
`;
// UserPage
export const PageWrapper = styled.div`
  width: 100%;
  min-height: 80vh;
  height: auto;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 3em;
`;

export const ButtonRight = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

// input table
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d6cfdb;
  margin-bottom: 2em;
`;

export const TableRow = styled.tr``;

export const LeftCell = styled.td`
  width: 20%;
  background-color: #d6cfdb;
  padding: 10px;
  text-align: center;
  border: 1px solid #d6cfdb;
`;

export const RightCell = styled.td`
  width: 80%;
  padding: 10px;
  border: 1px solid #d6cfdb;
`;

export const CheckBoxArea = styled.td`
  width: 100%;
  margin-bottom: 1em;
`;

export const ContentCell = styled.td`
  height: auto;
  padding: 10px;
  padding-bottom: 4em;
  border: 1px solid #d6cfdb;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px;
  border: 1px solid #d6cfdb;
`;
export const modules = {
  toolbar: {
    container: [
      ["image"],
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "underline", "italic"],
      ["link"],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
    ],
  },
  ImageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};
