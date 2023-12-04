import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartR } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  checkBoradCheck,
  postBoardCancelLike,
  postBoardLike,
} from "../../api/ErrorBoard";
import { userStateType } from "../../store/Utils/User";

function LikeButton() {
  const { data } = useSelector((state: RootState) => state.myError);
  const user = useSelector((state: userStateType) => state.user.data);
  const [toggle, setToggle] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);

  const checkLiked = async () => {
    try {
      if (!data || !user) return;
      const result = await checkBoradCheck(data?.id, user.id);
      setToggle(result);
      setLikes(data?.likes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLikedClick = async () => {
    if (!user || user.id === 0) {
      alert("비회원은 좋아요를 할 수 없습니다.");
      return;
    }
    if (!data) return;
    try {
      if (toggle) {
        await postBoardCancelLike(data.id, user.id);
      } else {
        await postBoardLike(data.id, user.id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setToggle(!toggle);
      setLikes((prevLikes) => (toggle ? prevLikes - 1 : prevLikes + 1));
    }
  };

  useEffect(() => {
    checkLiked();
  }, [data, user]);

  return (
    <ButtonWrapper>
      {toggle ? (
        <FontAwesomeIcon
          className="iconHeart"
          icon={faHeart}
          size="3x"
          style={{
            color: "red",
            transition: "0.3s all ease-in-out",
          }}
          onClick={handleLikedClick}
        />
      ) : (
        <FontAwesomeIcon
          className="iconHeart"
          icon={faHeartR}
          size="3x"
          style={{
            color: "grey",
            transition: "0.3s all ease-in-out",
          }}
          onClick={handleLikedClick}
        />
      )}

      <p>
        <strong>좋아요</strong> {likes}
      </p>
    </ButtonWrapper>
  );
}

export default LikeButton;

const ButtonWrapper = styled.div`
  margin-block: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  p {
    margin: 0;
  }
  .iconHeart:active {
    scale: 0.95;
  }
`;
