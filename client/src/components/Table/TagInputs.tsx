import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Content,
  ContentInput,
  ContentUl,
  Details,
  InputWrapper,
} from "@styles/tagInputStyle";
import { useState, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

type stateType = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};

export default function TagInputs(props: stateType) {
  const { tags, setTags } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const [maxTags] = useState<number>(10);

  const countTags = (): number => maxTags - tags.length;

  const createTag = () => {
    if (
      inputValue.length > 1 &&
      !tags.includes(inputValue) &&
      tags.length < maxTags
    ) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
  };

  const addTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createTag();
    }
  };

  const removeAllTags = () => {
    setTags([]);
  };
  return (
    <InputWrapper>
      <Content className="title">
        <ContentUl>
          <ContentInput
            spellCheck="false"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addTag}
          />
          <TagList tags={tags} removeTag={removeTag} />
        </ContentUl>
      </Content>
      <Details className="details">
        <p>
          <span>{countTags()}</span>개의 태그가 등록가능합니다.
        </p>
        <Button onClick={removeAllTags}>초기화</Button>
      </Details>
    </InputWrapper>
  );
}

type TagListProps = {
  tags: string[];
  removeTag: (tag: string) => void;
};

function TagList(props: TagListProps) {
  const { tags, removeTag } = props;
  return (
    <ul style={{ padding: 0 }}>
      {tags.map((tag, index) => (
        <li key={index}>
          {tag}{" "}
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faCircleXmark}
            onClick={() => removeTag(tag)}></FontAwesomeIcon>
        </li>
      ))}
    </ul>
  );
}
