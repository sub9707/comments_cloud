import styled from "styled-components";
import { MainContainer } from "../../styles/PageContainer";
import { PageHeader } from "../../styles/TextStyle";
import BannerLeft from "../../components/Service/BannerLeft";
import BannerRight from "../../components/Service/BannerRight";
import ServiceInfoOne from "../../components/Service/ServiceInfoOne";
import ServiceInfoTwo from "../../components/Service/ServiceInfoTwo";
import ServiceInfoThree from "../../components/Service/ServiceInfoThree";

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
