import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import ItemsCarousel from "react-items-carousel";
import CarouselCard from "../../components/UserProfile/CarouselCard";
import EmptyCarouselCard from "../../components/UserProfile/EmptyCarouselCard";

function RecentErrors() {
  const chevronWidth = 40;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
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
        <EmptyCarouselCard />
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
        <CarouselCard />
      </ItemsCarousel>
    </div>
  );
}

export default RecentErrors;
