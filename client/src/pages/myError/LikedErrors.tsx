import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import ItemsCarousel from "react-items-carousel";
import CarouselCard from "../../components/UserProfile/CarouselCard";
import { userStateType } from "../../store/Utils/User";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getLikedData } from "../../api/user";
import { recentErrorType } from "../../types/users";

function LikedErrors() {
  const { userId } = useParams();
  const user = useSelector((state: userStateType) => state.user.data);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [likedErrorData, setLikedData] = useState<recentErrorType[]>([]);
  const chevronWidth = 40;

  useEffect(() => {
    (async () => {
      try {
        const data = await getLikedData(userId || "");
        setLikedData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "30vh",
      }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={3}
        gutter={20}
        showSlither={true}
        leftChevron={<FontAwesomeIcon style={buttonStyle} icon={faCaretLeft} />}
        rightChevron={
          <FontAwesomeIcon style={buttonStyle} icon={faCaretRight} />
        }
        outsideChevron={false}
        chevronWidth={chevronWidth}>
        {likedErrorData.map((data, _idx) => (
          <CarouselCard {...data} key={_idx} />
        ))}
      </ItemsCarousel>
    </div>
  );
}

export default LikedErrors;

const buttonStyle = {
  width: "2em",
  height: "2em",
  borderRadius: "1em",
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(1px)",
  border: "1px solid rgba(255, 255, 255, 1)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  WebkitBackdropFilter: " blur(1px)",
  color: "grey",
};
