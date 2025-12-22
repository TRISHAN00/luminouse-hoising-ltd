"use client";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Line from "./Lines";

const Overview = ({ data }) => {
  return (
    <StyledComponent className="section-wrapper">
      <Line />
      <Container className="content">
        <Row>
          <Col md={11}>
            <h2>{data?.section_data?.subtitle}</h2>
          </Col>
          <Col lg={{ offset: 4, span: 7 }}>
            <p>{data?.section_data?.description}</p>
          </Col>
        </Row>
      </Container>
      <div className="bg-box"></div>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  background-color: #171717;
  position: relative;
  height: 100vh;
  min-height: 900px;
  overflow: hidden;

  @media (min-width: 768px) and (max-width: 991px) {
    min-height: unset;
  }

  h2 {
    font-size: 60px;
    width: 80%;
    text-transform: uppercase;

    /* Normal desktop :1200px. */
    @media (min-width: 1200px) and (max-width: 1500px) {
      width: 100%;
    }

    /* Normal desktop :992px. */
    @media (min-width: 992px) and (max-width: 1200px) {
      width: 100%;
    }

    /* Tablet desktop :768px. */
    @media (min-width: 768px) and (max-width: 991px) {
      width: unset;
      width: unset;
      font-size: 45px;
    }

    /* small mobile :320px. */
    @media (max-width: 767px) {
      width: unset;
      font-size: 32px;
    }
  }

  .section-wrapper {
    padding: 10rem 1rem;
  }

  .content {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
  }

  .bg-box {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    background-color: #262626;
    height: 450px;
    width: 450px;
    transition: all 0.3s ease-in-out;
  }

  p {
    color: #f7f7f792;
    font-size: 1.125rem;
    line-height: 1.7;
    max-width: 100%;
    margin-top: 2rem;
    width: 90%;

    @media (min-width: 1200px) and (max-width: 1500px) {
      width: 100%;
    }
  }

  @media (max-width: 992px) {
    .content {
      position: relative;
      padding-top: 6rem;
      padding-bottom: 6rem;
    }

    .bg-box {
      height: 300px;
      width: 300px;
    }

    p {
      font-size: 1rem;
    }
  }

  /* Tablet desktop :768px. */
  @media (min-width: 768px) and (max-width: 991px) {
  }

  @media (max-width: 767px) {
    height: fit-content;
    min-height: 0;
    overflow: hidden;
    padding-bottom: 60px;
    .content {
      flex-direction: column;
      align-items: flex-start;
    }

    .bg-box {
      height: 200px;
      width: 200px;
      top: 50%;
    }

    p {
      font-size: 0.95rem;
      margin-top: 1.5rem;
    }
  }
`;

export default Overview;
