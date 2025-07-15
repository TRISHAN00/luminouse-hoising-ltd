"use client";
import { Img } from "@/components/Img";
import Line from "@/components/Lines";
import { white } from "@/styles/globalStyleVars";
import HTMLReactParser from "html-react-parser";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export default function BOD({ boardMembers, data }) {
  return (
    <BODStyled>
      <Line />
      <Container>
        {data?.posts?.list.map((member, index) => (
          <Row
            className={`single-bod ${index % 2 !== 0 ? "even" : ""}`}
            key={member.id}
          >
            {index % 2 === 0 ? (
              // Odd rows (index is even since array is 0-indexed)
              <>
                <Col lg={4} md={5} sm={12}>
                  <div className="bod-wrap">
                    <div className="bod-img">
                      <Img
                        src={member?.images?.[0]?.full_path}
                        alt={member?.data?.title}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={{ offset: 1, span: 7 }} md={7} sm={12}>
                  <div className="bod-text">
                    <div className="bod-text__top">
                      <h4>{member?.data?.title}</h4>
                      <h5>{member?.data?.subtitle}</h5>
                    </div>
                    <div className="bod-text__bottom">
                      {HTMLReactParser(member?.data?.description || "")}
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              // Even rows (index is odd since array is 0-indexed)
              <>
                <Col lg={7} md={7} sm={12} className="bod-text-col">
                  <div className="bod-text">
                    <div className="bod-text__top">
                      <h4>{member?.data?.title}</h4>
                      <h5>{member?.data?.subtitle}</h5>
                    </div>
                    <div className="bod-text__bottom">
                      <p>{member?.data?.description || ""}</p>
                    </div>
                  </div>
                </Col>
                <Col
                  lg={{ offset: 1, span: 4 }}
                  md={5}
                  sm={12}
                  className="bod-img-col"
                >
                  <div className="bod-wrap">
                    <div className="bod-img">
                      <Img
                        src={member?.images?.[0]?.full_path}
                        alt={member?.data?.title}
                      />
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>
        ))}
      </Container>
    </BODStyled>
  );
}

const BODStyled = styled.section`
  padding: 200px 0;
  position: relative;
  background-color: #171717;
  overflow: hidden;

  .bod-img {
    padding-top: calc(480 / 400 * 100%);
    position: relative;
    margin-bottom: 30px;
  }

  .single-bod {
    margin-bottom: 150px;

    &:last-child {
      margin-bottom: 0;
    }

    &.even {
      .bod-text {
        @media (max-width: 991px) {
          text-align: left;
        }
      }
    }
  }

  .bod-text {
    &__top {
      margin-bottom: 40px;
      h4 {
        color: ${white};
        font-weight: 600;
        margin-bottom: 15px;
      }
      h5 {
        color: #c4c4c4;
      }
    }

    &__bottom {
      p {
        color: #c4c4c4;
        margin-bottom: 30px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  /* Responsive styles */
  @media (max-width: 991px) {
    padding: 80px 0;

    .single-bod {
      margin-bottom: 100px;
    }

    .bod-text {
      margin-top: 30px;
    }

    /* Reset the order for mobile */
    .even {
      .bod-text-col {
        order: 2;
      }
      .bod-img-col {
        order: 1;
      }
    }
  }

  @media (max-width: 767px) {
    padding: 60px 0;

    .single-bod {
      margin-bottom: 70px;
    }

    .bod-text {
      &__top {
        margin-bottom: 25px;
      }
    }
  }

  @media (max-width: 575px) {
    padding: 40px 0;

    .single-bod {
      margin-bottom: 50px;
    }

    .bod-img {
      padding-top: calc(
        300 / 400 * 100%
      ); /* Adjusted aspect ratio for smaller screens */
    }
  }
`;
