"use client";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Title from "../Title";

export default function FeatureSlider() {
  return (
    <FeaturedSlider>
      <Container>
        <Row>
          <Col lg={{ offset: 1, span: 10 }}>
            <Title
              center
              color={"#"}
              text={"DISCOVER OUR EXCLUSIVE CREATION OF FEATURED PROJECTS"}
              fontSize={"60"}
            />
          </Col>
        </Row>
        <Row>
            <Col lg={4} >
                <div className="single-feature">
                    <Image/>
                </div>
            </Col>
        </Row>
      </Container>
    </FeaturedSlider>
  );
}

const FeaturedSlider = styled.section`
  padding: 120px 0;
`;
