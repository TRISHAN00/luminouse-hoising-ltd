"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import dream from "../../public/images/dynamic/home/build-dream-01.jpg";
import dream1 from "../../public/images/dynamic/home/build-dream-02.jpg";
import Button from "../Button";
import { Img } from "../Img";
import Line from "../Lines";

export default function Dream() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      const container = document.querySelector(".container");
      if (container) {
        setOffset(container.offsetLeft);
      }
    };

    // Initial calculation
    updateOffset();

    // Add resize listener
    window.addEventListener("resize", updateOffset);

    // Cleanup
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return (
    <DreamStyled>
      <Line background={"#1717171a"} />
      <Container className="content-container">
        <Row>
          <Col className="dream-title" lg={12}>
            <h2>Dream. Build. Live.</h2>
          </Col>
          <Col lg={4}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium modi cum cumque neque consequuntur praesentium veniam.
              Odio vitae sapiente facilis in laborum vel consequatur debitis
              non, numquam minima accusamus est!
            </p>
          </Col>
          <Col lg={4}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium modi cum cumque neque consequuntur praesentium veniam.
              Odio vitae sapiente facilis in laborum vel consequatur debitis
              non, numquam minima accusamus est!
            </p>
          </Col>
        </Row>
      </Container>

      <ImageGalleryWrapper>
        <LeftImageContainer
          style={{ marginLeft: offset ? `${offset}px` : "0" }}
        >
          <Img src={dream} alt="Dream building exterior" />
        </LeftImageContainer>

        <RightContentContainer>
          <RightImageContainer>
            <Img src={dream1} alt="Dream building interior" />
          </RightImageContainer>
          <LearnMoreBtn>
            <Button border={'1px solid #171717'} hoverBackground={'#171717'} text={"Learn More"} />
          </LearnMoreBtn>
        </RightContentContainer>
      </ImageGalleryWrapper>
    </DreamStyled>
  );
}

const DreamStyled = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  height: 100vh;
  background-color: #ffffff;

  .content-container {
    margin-bottom: 60px;
  }

  .dream-title {
    h2 {
      font-size: 48px;
      font-weight: 600;
      margin-bottom: 40px;
      color: #171717;
    }
  }

  p {
    font-size: 16px;
    line-height: 1.8;
    color: #555;
  }

  @media (max-width: 991px) {
    padding: 80px 0 0;

    .dream-title h2 {
      font-size: 40px;
    }
  }

  @media (max-width: 767px) {
    padding: 60px 0 0;

    .dream-title h2 {
      font-size: 32px;
    }
  }
`;

const LearnMoreBtn = styled.div`
  margin-top: 40px;
  margin-right: auto;

  @media (max-width: 767px) {
    margin-left: 15px;
  }
`

const ImageGalleryWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  gap: 30px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const LeftImageContainer = styled.div`
  position: relative;
  width: 70%;
  height: 800px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
  }

  @media (max-width: 991px) {
    height: 500px;
  }

  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0 !important;
    height: 350px;
  }
`;

const RightContentContainer = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const RightImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
  }

  @media (max-width: 991px) {
    height: 300px;
  }

  @media (max-width: 767px) {
    height: 250px;
    margin-top: 20px;
  }
`;
