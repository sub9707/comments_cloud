import React, { useState } from "react";
import {
  ContentInfoLeft,
  ContentInfoRight,
  ControlInfo,
} from "../../styles/ModalStyle/ErrorModalView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEye,
  faShareFromSquare,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { formatRelativeTime } from "../../utils/Calculation";
import SharePopOver from "../Cards/SharePopOverCard";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { userStateType } from "../../store/Utils/User";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../store/Modal/Modal";
import { deleteError } from "../../api/ErrorBoard";

function ContentControl() {
  const [toggleSharePop, setToggleSharePop] = useState<boolean>(false);
  const { data } = useSelector((state: RootState) => state.myError);
  const user = useSelector((state: userStateType) => state.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleUpdateError = () => {
    dispatch(closeModal());
    navigate(`/myError/edit/${data?.id}`);
  };
  const handleDeleteError = async () => {
    if (!data) return;
    try {
      await deleteError(data?.id);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(closeModal());
      navigate(`/myError`);
    }
  };
  return (
    <>
      <ContentInfoLeft>
        <p>
          <FontAwesomeIcon icon={faCalendarDays} />
          &nbsp; {formatRelativeTime(data?.write_date || "")}
        </p>
        <p>{data?.publicCheck === 1 ? "공개" : "비공개"}</p>
        {data?.writer_id === user?.id ? (
          <>
            {" "}
            <p className="text-underline-hover" onClick={handleUpdateError}>
              수정
            </p>
            <p className="text-underline-hover" onClick={handleDeleteError}>
              삭제
            </p>
          </>
        ) : null}

        <ControlInfo>
          <FontAwesomeIcon
            icon={faShareFromSquare}
            onClick={() => setToggleSharePop(!toggleSharePop)}
          />
          {toggleSharePop && <SharePopOver setisopen={setToggleSharePop} />}
        </ControlInfo>
      </ContentInfoLeft>
      <ContentInfoRight>
        <p>
          <FontAwesomeIcon icon={faEye} />
          &nbsp;{data?.views}
        </p>
        <p>
          <FontAwesomeIcon icon={faThumbsUp} /> &nbsp;{data?.likes}
        </p>
      </ContentInfoRight>
    </>
  );
}

export default ContentControl;
