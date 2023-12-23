import {
  ContactArea,
  IntroBanner,
  MainContainer,
  MyErrorBanner,
  ServiceArea,
} from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import BannerLeft from "../../components/Service/BannerLeft";
import BannerRight from "../../components/Service/BannerRight";
import ServiceInfoOne from "../../components/Service/ServiceInfoOne";
import ErrorBannerLeft from "../../components/Service/ErrorBannerLeft";
import ErrorBannerRight from "../../components/Service/ErrorBannerRight";
import ContactForm from "../../components/Service/ContactForm";
import ContactImage from "../../components/Service/ContactImage";
import ServiceData from "./ServiceBanner.json";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import infoData from "./ServiceInfoBottom.json";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBook, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";

library.add(faBook, faComments, faSeedling);

export default function ServicePage() {
  const iconArray = [faBook, faComments, faSeedling];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <MainContainer ref={containerRef}>
      <motion.div className="bar" style={{ scaleX }} />
      <PageHeader>서비스 소개</PageHeader>
      <br />
      <IntroBanner>
        <BannerLeft />
        <BannerRight />
      </IntroBanner>
      <ServiceArea>
        {infoData.map((data, _idx) => (
          <ServiceInfoOne {...data} iconType={iconArray[_idx]} key={_idx} />
        ))}
      </ServiceArea>
      <br />
      <br />
      <br />
      <br />
      <MyErrorBanner>
        <ErrorBannerLeft
          {...ServiceData[0]}
          reversed={false}
          onRef={containerRef}
        />
        <ErrorBannerRight
          onRef={containerRef}
          reversed={false}
          imgSrc={"/images/MyError.gif"}
        />
      </MyErrorBanner>
      <br />
      <br />
      <MyErrorBanner>
        <ErrorBannerRight
          reversed={true}
          onRef={containerRef}
          imgSrc={"/images/modoo.gif"}
        />
        <ErrorBannerLeft
          {...ServiceData[1]}
          reversed={true}
          onRef={containerRef}
        />
      </MyErrorBanner>
      <br />
      <br />
      <MyErrorBanner>
        <ErrorBannerLeft
          {...ServiceData[2]}
          reversed={false}
          onRef={containerRef}
        />
        <ErrorBannerRight
          onRef={containerRef}
          reversed={false}
          imgSrc={"/images/Profile.gif"}
        />
      </MyErrorBanner>
      <br />
      <br />
      <ContactArea>
        <ContactForm onRef={containerRef} />
        <ContactImage onRef={containerRef} />
      </ContactArea>
    </MainContainer>
  );
}
