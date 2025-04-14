"use client";
import { Img } from "@/components/Img";
import Line from "@/components/Lines";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export default function BOD() {
  return (
    <BODStyled>
      <Line />
      <Container>
        <Row>
          <Col lg={5}>
            <div className="bod-wrap">
              <div className="bod-img">
                <Img />
              </div>
            </div>
          </Col>
          <Col lg={{ offset: 1, span: 6 }}>content</Col>
        </Row>
      </Container>
    </BODStyled>
  );
}

const BODStyled = styled.section`
  padding: 120px 0;

  .bod-img {
    position: relative;
    padding-top: calc(470 / 445 * 100%);
  }
`;
