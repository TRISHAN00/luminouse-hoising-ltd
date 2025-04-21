// components/ClientSection/index.jsx
"use client";

import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Line from "../Lines";
import ClientCard from "./ClientCard";

export default function ClientSection() {
  return (
    <SectionStyled className="pt-200 pb-200">
      <Line background={"#1717171a"} />
      <Container>
        <Row>
          <Col lg={3}>
            <SideTitle>
              <VerticalTextWrapper>
                <VerticalText>STAND WITH US</VerticalText>
                <VerticalText>GROW WITH US</VerticalText>
              </VerticalTextWrapper>
            </SideTitle>
          </Col>

          <Col lg={9}>
            <Row>
              <Col lg={6} className="mb-4 mb-lg-0">
                <ClientCard
                  url={"/landowner"}
                  title="Landowner"
                  imagePath="/images/dynamic/home/landowner.jpg"
                  description="Driven by integrity and customer satisfaction, we focus on delivering projects that exceed expectations. From thoughtfully planned communities to we build spaces where families thrive and dreams take shape."
                />
              </Col>
              <Col lg={6}>
                <ClientCard
                  url={"/buyer"}
                  title="Buyer"
                  imagePath="/images/dynamic/home/buyer.jpg"
                  description="Discover thoughtfully designed homes built with quality and community in mind. Our developments provide the perfect foundation for families to grow and create lasting memories in spaces crafted for modern living."
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </SectionStyled>
  );
}

const SectionStyled = styled.section`
  position: relative;
`;

const SideTitle = styled.div`
  @media (min-width: 992px) {
    position: relative;
  }
`;

const VerticalTextWrapper = styled.div`
  margin-bottom: 40px;
  @media (min-width: 992px) {
    position: sticky;
    top: 8rem;
    transform: rotate(180deg);
    writing-mode: vertical-lr;
    height: auto;
  }

  @media (min-width: 767px) {
    margin-bottom: 2rem;
  }
`;

const VerticalText = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  margin: 0;
  color: #171717;

  &:not(:first-child) {
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 992px) {
    font-size: 3.5rem;
  }
`;
