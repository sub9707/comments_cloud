import styled from "styled-components";
import { MainContainer } from "../../styles/PageContainer";
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

export default function ServicePage() {
  return (
    <MainContainer>
      <PageHeader>서비스 소개</PageHeader>
      <br />
      <IntroBanner>
        <BannerLeft />
        <BannerRight />
      </IntroBanner>
      <ServiceArea>
        <ServiceInfoOne />
        <ServiceInfoTwo />
        <ServiceInfoThree />
      </ServiceArea>
      <br />
      <br />
      <MyErrorBanner>
        <ErrorBannerLeft />
        <ErrorBannerRight />
      </MyErrorBanner>
      <MyErrorBanner>
        <ErrorBannerLeft />
        <ErrorBannerRight />
      </MyErrorBanner>
      <MyErrorBanner>
        <ErrorBannerLeft />
        <ErrorBannerRight />
      </MyErrorBanner>
      <br />
      <br />
      <ContactArea>
        <ContactForm />
        <ContactImage />
      </ContactArea>
    </MainContainer>
  );
}

export const IntroBanner = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
`;
export const ServiceArea = styled.div`
  width: 100%;
  height: 18vh;
  display: flex;
  justify-content: center;
  margin-top: 2em;
`;
export const MyErrorBanner = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
`;
export const ContactArea = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 10em;
  margin-bottom: 10em;
`;
