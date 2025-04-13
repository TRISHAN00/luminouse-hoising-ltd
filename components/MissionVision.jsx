"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import mission from "../public/images/dynamic/home/mission.jpg";
import vision from "../public/images/dynamic/home/vision.jpg";
import { Img } from "./Img";

export default function MissionVision() {
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
    <MissionVisionStyled>
      <Container className="p-0" fluid>
        <Row>
          <Col lg={8}>
            <div style={{ marginLeft: offset + "px" }} className="left-content">
              <div className="left-content-img">
                <Img src={mission} />
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div className="right-content-img">
              <Img src={vision} />
            </div>
          </Col>
        </Row>
      </Container>
    </MissionVisionStyled>
  );
}

const MissionVisionStyled = styled.section`
  padding-bottom: 120px;
  position: relative;

  &::before {
    position: absolute;
    content: '';
    inset: 0;
    height: 200px;
    background-color: #171717;
  }

  .left-content-img {
    position: relative;
    padding-top: calc(650 / 850 * 100%);
  }

  .right-content-img {
    position: relative;
    padding-top: calc(370 / 370 * 100%);
  }
`;
