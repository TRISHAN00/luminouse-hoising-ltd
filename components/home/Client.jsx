// components/ClientSection/index.jsx
"use client";

import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Line from "../Lines";
import ClientCard from "./ClientCard";

export default function ClientSection({ data }) {
  const hltf = data?.section_data?.short_desc;
  const hlts = data?.section_data?.subtitle;
  const landowner = data?.posts?.list?.find(
    (f) => f?.data?.slug === "landowner"
  );

  const buyer = data?.posts?.list?.find(
    (f) => f?.data?.slug === "buyer"
  );

  return (
    <SectionStyled className=" pb-200">
      <Line background={"#1717171a"} />
      <Container>
        <Row>
          <Col lg={3}>
            <SideTitle>
              <VerticalTextWrapper>
                <VerticalText>{hltf}</VerticalText>
                <VerticalText>{hlts}</VerticalText>
              </VerticalTextWrapper>
            </SideTitle>
          </Col>

          <Col lg={9}>
            <Row>
              <Col lg={6} className="mb-4 mb-lg-0">
                {landowner && (
                  <ClientCard
                    url={`${landowner?.data?.slug}`}
                    title={landowner?.data?.subtitle}
                    imagePath={landowner?.images?.[0]?.full_path}
                    description={landowner?.data?.short_desc}
                  />
                )}
              </Col>
              <Col lg={6}>
              {buyer && (
                  <ClientCard
                    url={`${buyer?.data?.slug}`}
                    title={buyer?.data?.title}
                    imagePath={buyer?.images?.[0]?.full_path}
                    description={buyer?.data?.short_desc}
                  />
                )}
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
  overflow: hidden;
`;

const SideTitle = styled.div`
  @media (min-width: 992px) {
    position: relative;
  }
`;

const VerticalTextWrapper = styled.div`
  margin-bottom: 40px;
  text-transform: uppercase;
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
