import styled from "styled-components";

function ErrorBannerLeft() {
  return (
    <ErrorBannerBox>
      <ErrorBannerTitle>ErrorBanner Text Title</ErrorBannerTitle>
      <ErrorBannerSubtitle>
        This is ErrorBanner Subtitle.
        <br />
        Two Lines of Texts will be attached here. This Line must be something.
      </ErrorBannerSubtitle>
      <ul>
        <li>number 1 </li>
        <li>number 2</li>
        <li>number 3</li>
        <li>number 4</li>
      </ul>
    </ErrorBannerBox>
  );
}

export default ErrorBannerLeft;

const ErrorBannerBox = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5em;
  ul {
    padding-inline: 1em;
  }
  color: #5528a7;
`;

const ErrorBannerTitle = styled.h4`
  font-family: "ONE-Mobile-Title";
`;
const ErrorBannerSubtitle = styled.p``;
