"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import mission from "../public/images/dynamic/home/mission.jpg";
import vision from "../public/images/dynamic/home/vision.jpg";
import { Img } from "./Img";

export default function MissionVision({isMissionVision, isBgColor}) {
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
    <MissionVisionStyled isBgColor >
      <Container className="p-0" fluid>
        <Row className="image-row">
          <Col lg={8} md={7} sm={12}>
            <div
              style={{ marginLeft: offset + 15 + "px" }}
              className="left-content"
            >
              <div className="left-content-img">
                <Img src={mission} />
              </div>
            </div>
          </Col>

          <Col lg={4} md={5} sm={12}>
            <div className="right-content-img">
              <Img src={vision} />
            </div>
          </Col>
        </Row>
      </Container>
      {!isMissionVision &&  <div className="mission-vision-area">
        <Container>
          <Row>
            <Col lg={3} md={6} sm={12} className="mb-md-4 mb-sm-4">
              <div className="mission-vision">
                <h4>Mission</h4>
                <p>
                  At Luminouse Ltd, we turn your vision into reality by creating
                  homes that blend comfort, elegance, and modern design. With a
                  commitment to quality craftsmanship and innovation, we build
                  spaces where families thrive and dreams take shape.
                </p>
              </div>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <div className="mission-vision">
                <h4>Vision</h4>
                <p>
                  Driven by integrity and customer satisfaction, we focus on
                  delivering projects that exceed expectations. From
                  thoughtfully planned communities to custom homes, we build spaces where
                  families thrive and dreams take shape.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>}
     
    </MissionVisionStyled>
  );
}

const MissionVisionStyled = styled.section`
  padding-bottom: 120px;
  position: relative;
  overflow: hidden;

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
    background-color: ${props => props.isBgColor ? '' : '#171717'} ;
  }

  .left-content-img {
    position: relative;
    padding-top: calc(650 / 850 * 100%);
  }

  .right-content-img {
    position: relative;
    padding-top: calc(370 / 370 * 100%);
  }
  
  /* Responsive styles */
  @media (max-width: 1200px) {
    .mission-vision-area {
      padding-top: 100px;
    }
    
    .mission-vision h4 {
      font-size: 34px;
    }
  }
  
  @media (max-width: 992px) {
    padding-bottom: 80px;
    
    .mission-vision-area {
      padding-top: 80px;
    }
    
    .mission-vision h4 {
      font-size: 30px;
      margin-bottom: 20px;
    }
  }
  
  @media (max-width: 768px) {
    padding-bottom: 60px;
    
    &::before {
      height: 150px;
    }
    
    .mission-vision-area {
      padding-top: 60px;
    }
    
    .mission-vision {
      margin-bottom: 30px;
    }
    
    .mission-vision h4 {
      font-size: 28px;
      margin-bottom: 15px;
    }
    
    .left-content {
      margin-left: 0 !important;
    }
    
    .image-row {
      margin: 0;
    }
  }
  
  @media (max-width: 576px) {
    padding-bottom: 40px;
    
    &::before {
      height: 100px;
    }
    
    .mission-vision-area {
      padding-top: 40px;
    }
    
    .mission-vision h4 {
      font-size: 24px;
    }
    
    .left-content-img,
    .right-content-img {
      padding-top: calc(400 / 600 * 100%);
    }
    
    .right-content-img {
      margin-top: 15px;
    }
  }
`;