import React, { useState } from "react";
import {
  AddCommentArea,
  CommentInput,
  CommentSubmitBtn,
  CommentSubmitBtnGroup,
} from "../../styles/ModalStyle/ErrorModalView";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { ErrorReplyType } from "../../types/BoardTypes";
import { userStateType } from "../../store/Utils/User";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { addReply } from "../../store/DataThunk/RepliesSlice";

function WriteCommentArea() {
  const { data } = useSelector((state: RootState) => state.myError);
  const user = useSelector((state: userStateType) => state.user.data);
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const [replyWrite, setReplyWrite] = useState<string>("");
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyWrite(e.target.value);
  };
  const handleAddReply = () => {
    try {
      if (data) {
        const props: ErrorReplyType = {
          content: replyWrite,
          content_id: data?.id,
          writer_id: user?.id,
        };
        dispatch(addReply(props));
        alert("댓글이 등록되었습니다.");
      }
      setReplyWrite("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <AddCommentArea>
      <CommentInput value={replyWrite} onChange={handleInputChange} />
      <CommentSubmitBtnGroup>
        <CommentSubmitBtn
          style={{ backgroundColor: "#8782d6", color: "white" }}
          onClick={handleAddReply}>
          등록하기
        </CommentSubmitBtn>
        <CommentSubmitBtn
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #8782d6",
            color: "#8782d6",
          }}>
          초기화
        </CommentSubmitBtn>
      </CommentSubmitBtnGroup>
    </AddCommentArea>
  );
}

export default WriteCommentArea;
