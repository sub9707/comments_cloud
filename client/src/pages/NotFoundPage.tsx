import { Link } from "react-router-dom";
import styled from "styled-components";

export default function PageNotFound() {
  const NotFoundWrapper = styled.div`
    position: relative;
    height: 100vh;
  `;

  const NotFoundContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 460px;
    width: 100%;
    text-align: center;
    line-height: 1.4;
  `;

  const NotFound404 = styled.div`
    position: relative;
    width: 180px;
    height: 180px;
    margin: 0px auto 50px;
  `;

  const NotFound404Inner = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #ffa200;
    transform: rotate(45deg);
    border: 5px dashed #000;
    border-radius: 5px;

    &:before {
      content: "";
      position: absolute;
      left: -5px;
      right: -5px;
      bottom: -5px;
      top: -5px;
      box-shadow: 0px 0px 0px 5px rgba(0, 0, 0, 0.1) inset;
      border-radius: 5px;
    }
  `;

  const NotFoundHeading = styled.h1`
    color: #000;
    font-weight: 700;
    margin: 0;
    font-size: 90px;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    text-align: center;
    height: 40px;
    line-height: 40px;
  `;

  const NotFoundTitle = styled.h2`
    font-size: 33px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 7px;
  `;

  const NotFoundText = styled.p`
    font-size: 16px;
    color: #000;
    font-weight: 400;
  `;

  const HomeLink = styled.a`
    display: inline-block;
    padding: 10px 25px;
    background-color: #8f8f8f;
    border: none;
    border-radius: 40px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    transition: 0.2s all;

    &:hover {
      background-color: #2c2c2c;
    }
  `;
  return (
    <NotFoundWrapper>
      <NotFoundContainer>
        <NotFound404>
          <NotFound404Inner></NotFound404Inner>
          <NotFoundHeading>404</NotFoundHeading>
        </NotFound404>
        <NotFoundTitle>Page not found</NotFoundTitle>
        <NotFoundText>
          현재 페이지는 없어진 페이지이거나, <br />
          일시적으로 사용할 수 없는 페이지입니다.
        </NotFoundText>
        <HomeLink to={"/"} as={Link}>
          홈으로
        </HomeLink>
      </NotFoundContainer>
    </NotFoundWrapper>
  );
}
