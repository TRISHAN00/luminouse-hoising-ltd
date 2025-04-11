"use client";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Line from "./Lines";
import Title from "./Title";

const MyComponent = () => {
  return (
    <StyledComponent className="section-wrapper">
      <Line />
      <Container className="content">
        <Row>
          <Col lg={8}>
            <Title
              fontSize={"60"}
              text={
                "BUILDING BRIGHTER FUTURES WITH EXCELLENCE IN REAL ESTATE DEVELOPMENT"
              }
            />
          </Col>
          <Col lg={{ offset: 4, span: 6 }}>
            <p>
              At Luminous Housing Ltd., we turn your vision into reality by
              creating homes that blend comfort, elegance, and modern design.
              With a commitment to quality craftsmanship and innovation, we
              build spaces where families thrive and dreams take shape. Driven
              by integrity and customer satisfaction, we focus on delivering
              projects that exceed expectations.
            </p>
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
  min-height: 700px;
  overflow: hidden;

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

  @media (max-width: 576px) {
    height: fit-content;
    min-height: 0;
    overflow: hidden;
    padding: 120px 0;
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

export default MyComponent;
