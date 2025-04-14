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
            <div
              style={{ marginLeft: offset + 15 + "px" }}
              className="left-content"
            >
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
      <div className="mission-vision-area">
        <Container>
          <Row>
            <Col lg={3}>
              <div className="mission-vision">
                <h4>Mission</h4>
                <p>
                  At Luminouse Ltd, we turn your vision into reality by creating
                  homes that blend comform, elegance, and modern design. With a
                  commitment to quality craftsmanship and innovatio, we build
                  spaces wheres families thrive and dreams take shape.
                </p>
              </div>
            </Col>
            <Col lg={3}>
              <div className="mission-vision">
                <h4>Vision</h4>
                <p>
                  Driven by integrity and customer satisfaction, we focus on
                  delivering projects that exceed expectation. From
                  throughtfully planned commjunities to we build spaces where
                  familites thrive and dream s take shape.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </MissionVisionStyled>
  );
}

const MissionVisionStyled = styled.section`
  padding-bottom: 120px;
  position: relative;

  .mission-vision-area {
    padding-top: 120px;
    .mission-vision {
      h4 {
        color: #5e5e5e;
        font-size: 40px;
        margin-bottom: 25px;
      }

      p {
        color: #5e5e5e;
      }
    }
  }

  &::before {
    position: absolute;
    content: "";
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
