import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import styled from "styled-components";

function TagsArea() {
  const [tags, setTags] = useState<string[]>([]);
  const dataState = useSelector((state: RootState) => state.myError);

  useEffect(() => {
    if (dataState.data) {
      setTags(JSON.parse(dataState.data?.tags));
    }
  }, [dataState]);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      태그:&nbsp;{" "}
      {tags ? tags.map((tag, _idx) => <TagBox>#{tag}&nbsp;</TagBox>) : null}
    </div>
  );
}

export default TagsArea;

const TagBox = styled.p`
  margin-block: 0;
  padding-inline: 0.8em;
  padding-block: 0.2em;
  background-color: #f7f7e5;
  margin-inline: 0.5em;
  border-radius: 8px;
  color: grey;
`;
