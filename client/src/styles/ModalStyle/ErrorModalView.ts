import styled from "styled-components";

export const TitleHeader = styled.div`
  width: 100%;
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
  display: flex;

  p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 2.3em;
    width: 95%;
    max-width: 100%;
    margin: 0;
  }
  img {
    width: 3em;
    height: 3em;
    margin-left: 0.5em;
    object-fit: cover;
    margin-bottom: 1em;
  }
`;

export const SubTitleHeader = styled.h3`
  color: #777777;
  font-weight: 600;
  margin-block: 0.7em;
`;
export const SubHeader = styled.h4`
  color: #3d3d3d;
  font-weight: 600;
  margin-block: 0.7em;
  font-size: large;
`;

export const ContentInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #7a7a7a;
  p {
    margin: 0;
  }
`;
export const ContentViewArea = styled.div`
  width: 100%;
  min-height: 10vh;
  height: auto;
  background-color: #fffff9;
  box-shadow: rgb(114, 114, 114) 0px 0px 5px 2px inset;
  padding: 1em;
`;
export const ControlInfo = styled.p`
  position: relative;
  cursor: pointer;
  &:hover {
    font-weight: 600;
  }
`;
export const ContentInfoLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
export const ContentInfoRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;
export const CommentArea = styled.div`
  display: block;
  width: 100%;
  height: auto;
`;
export const MoreComments = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-top: 2em;
  p {
    margin: 0;
    width: auto;
    color: grey;
    cursor: pointer;
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const AddCommentArea = styled.div`
  width: 100%;
  height: 7em;
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5em;
`;
export const CommentInput = styled.textarea`
  position: relative;
  width: 80%;
  height: 90%;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  outline: none;
`;
export const CommentSubmitBtnGroup = styled.div`
  width: 12%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding-top: 0.3em;
`;

export const CommentSubmitBtn = styled.button`
  width: 100%;
  height: 2em;
  border: 1px solid #bebebe;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  &:active {
    box-shadow: none;
  }
`;
export const CommentReplyArea = styled.div`
  width: 90%;
  margin-left: 5em;
  margin-bottom: 2em;
`;
