import { useParams } from "react-router-dom";
import { MainContainer } from "../../styles/PageContainer";
import { useEffect, useState } from "react";
import { getBoardError } from "../../api/ErrorBoard";
import { useDispatch, useSelector } from "react-redux";
import { setMyErrorData } from "../../store/Modal/MyErrorModal";
import { RootState } from "../../store";

function ErrorView() {
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.myError);
  useEffect(() => {
    (async () => {
      try {
        if (boardId) {
          const result = await getBoardError(+boardId);
          dispatch(setMyErrorData(result));
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    })();
  }, []);
  console.log(data);
  return <MainContainer></MainContainer>;
}

export default ErrorView;
