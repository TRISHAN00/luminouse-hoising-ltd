"use client";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Button from "./Button";
import Line from "./Lines";
import PropertyInfoTable from "./PropertyInfoTable";
import Title from "./Title";

const AtaGlance = ({ data, projectData, atAGlanceImg }) => {
  const brochure = projectData?.data?.files?.list?.[0]?.full_path;

  const thumbImg = atAGlanceImg?.images?.[0]?.full_path;

  return (
    <StyledComponent className="section-wrapper">
      <Line />
      <Container fluid>
        <Row>
          <Col lg={8} className="content-col">
            <Container>
              <Row>
                <Col lg={{ offset: 2, span: 10 }}>
                  <Title fontSize={"60"} text={"AT A GLANCE"} />
                </Col>
                <Col lg={{ offset: 2, span: 8 }}>
                  <div className="at-a-glance-wrap">
                    <PropertyInfoTable data={data} />
                  </div>
                </Col>
                <Col lg={12}>
                  {brochure && (
                    <div className="brochure-btn">
                      <Button
                        border={"1px solid #0288D1"}
                        hoverBackground={"#0288D1"}
                        text={"Download Brochure"}
                        src={brochure}
                      />
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </Col>

          <Col lg={{ span: 4 }} className="image-col">
            {thumbImg && (
              <div className="image-container">
                {thumbImg ? (
                  <img
                    src={thumbImg}
                    alt="Property at a glance"
                    className="section-image"
                  />
                ) : (
                  <div className="placeholder-image">
                    <div className="placeholder-content">
                      <div className="placeholder-icon">🏢</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
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

  .content-col {
    display: flex;
    align-items: center;
    min-height: 100vh;
    padding: 2rem 0;
  }

  .image-col {
    padding: 0;
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .image-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .section-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  .section-image:hover {
    transform: scale(1.05);
  }

  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 3px solid #0288d1;
  }

  .placeholder-content {
    text-align: center;
    color: #888;
  }

  .placeholder-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  .placeholder-content p {
    font-size: 1.2rem;
    margin: 0;
    color: #666;
  }

  .bg-box {
    position: absolute;
    top: 40%;
    left: 25%;
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

  @media (min-width: 992px) and (max-width: 1200px) {
    .content {
      position: relative;
      padding-top: 6rem;
      padding-bottom: 6rem;
    }

    .content-col {
      min-height: auto;
    }

    .image-col {
      height: 50vh;
      margin-top: 3rem;
    }

    .bg-box {
      height: 300px;
      width: 300px;
      left: 50%;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 767px) {
    height: fit-content;
    min-height: 0;
    overflow: hidden;
    padding-top: 120px;
    padding-bottom: 0px;

    .content {
      flex-direction: column;
      align-items: flex-start;
    }

    .content-col {
      min-height: auto;
    }

    .image-col {
      height: 100%;
      margin-top: 2rem;
    }

    .bg-box {
      height: 200px;
      width: 200px;
      top: 50%;
      left: 50%;
    }

    p {
      font-size: 0.95rem;
      margin-top: 1.5rem;
    }

    .placeholder-icon {
      font-size: 3rem;
    }

    .placeholder-content p {
      font-size: 1rem;
    }
  }
`;

export default AtaGlance;
