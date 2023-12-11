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
import ServiceInfoTwo from "../../components/Service/ServiceInfoTwo";
import ServiceInfoThree from "../../components/Service/ServiceInfoThree";
import ErrorBannerLeft from "../../components/Service/ErrorBannerLeft";
import ErrorBannerRight from "../../components/Service/ErrorBannerRight";
import ContactForm from "../../components/Service/ContactForm";
import ContactImage from "../../components/Service/ContactImage";
import ServiceData from "./ServiceInfo.json";
import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

export default function ServicePage() {
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
        <motion.div>
          <BannerRight />
        </motion.div>
      </IntroBanner>
      <ServiceArea>
        <ServiceInfoOne />
        <ServiceInfoTwo />
        <ServiceInfoThree />
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
        <ErrorBannerRight onRef={containerRef} reversed={false} />
      </MyErrorBanner>
      <br />
      <br />
      <MyErrorBanner>
        <ErrorBannerRight reversed={true} onRef={containerRef} />
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
        <ErrorBannerRight onRef={containerRef} reversed={false} />
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
