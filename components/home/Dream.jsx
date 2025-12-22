"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Line from "../Lines";
import MissionVision from "../MissionVision";

export default function Dream({ data }) {
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


  const large = data?.images?.list?.find(f => f.large === 'on');
  const medium = data?.images?.list?.find(f => f.medium === 'on');


  return (
    <DreamStyled>
      <Line background={"#1717171a"} />
      <Container className="content-container">
        <Row>
          <Col className="dream-title" lg={12}>
            <h2>{data?.section_data?.subtitle}</h2>
          </Col>
          <Col lg={4}>
            <p>{data?.section_data?.short_desc}</p>
          </Col>
          <Col lg={4}>
            <p>{data?.section_data?.description}</p>
          </Col>
        </Row>
      </Container>

      <MissionVision isMissionVision isBgColor large={large} medium={medium} />
    </DreamStyled>
  );
}

const DreamStyled = styled.section`
  padding: 120px 0;
  position: relative;
  overflow: hidden;
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
`;

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
