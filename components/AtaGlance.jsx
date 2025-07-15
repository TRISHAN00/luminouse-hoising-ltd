"use client";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Button from "./Button";
import Line from "./Lines";
import PropertyInfoTable from "./PropertyInfoTable";
import Title from "./Title";

const AtaGlance = ({ data }) => {
  return (
    <StyledComponent className="section-wrapper">
      <Line />
      <Container className="content">
        <Row>
          <Col lg={12}>
            <Title fontSize={"60"} text={"AT A GLANCE"} />
          </Col>
          <Col lg={{ offset: 2, span: 10 }}>
            <div className="at-a-glance-wrap">
              <PropertyInfoTable data={data} />
            </div>
          </Col>
          <Col lg={12}>
            <div className="brochure-btn">
              <Button
                border={"1px solid #0288D1"}
                hoverBackground={"#0288D1"}
                text={"Download Brochure"}
              />
            </div>
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
  overflow: hidden;

  .at-a-glance-wrap {
    margin-top: 60px;
  }

  .brochure-btn {
    margin-top: 60px;
    display: flex;
    justify-content: end;
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

    /* Normal desktop :1200px. */
    @media (min-width: 1200px) and (max-width: 1500px) {
      height: 300px;
      width: 300px;
    }

    /* Normal desktop :992px. */
    @media (min-width: 992px) and (max-width: 1200px) {
      height: 300px;
      width: 300px;
    }
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

export default AtaGlance;
