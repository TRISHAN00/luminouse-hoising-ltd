"use client";
import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import bgImage from "../public/images/dynamic/landowner/testimonial-bg.jpg";
import { Img } from "./Img";

// Bird SVG components
const BirdIcon1 = () => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="bird-icon bird-icon-1"
  >
    <path
      d="M26.5 8.5C24.5 10.5 11 23 3 28.5L12.5 26L16 31L18 19.5L31.5 7.5C29.5 4.5 26.5 8.5 26.5 8.5Z"
      fill="currentColor"
    />
  </svg>
);

const BirdIcon2 = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="bird-icon bird-icon-2"
  >
    <path
      d="M30.5 12.5C28.5 14.5 15 27 7 32.5L16.5 30L20 35L22 23.5L35.5 11.5C33.5 8.5 30.5 12.5 30.5 12.5Z"
      fill="currentColor"
    />
  </svg>
);

export default function TestimonialSection({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const contentSwiperRef = useRef(null);
  const imageSwiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handlePrev = () => {
    if (contentSwiperRef.current && imageSwiperRef.current) {
      contentSwiperRef.current.slidePrev();
      imageSwiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (contentSwiperRef.current && imageSwiperRef.current) {
      contentSwiperRef.current.slideNext();
      imageSwiperRef.current.slideNext();
    }
  };

  // Star Rating component
  const StarRating = ({ rating }) => {
    return (
      <RatingContainer>
        {[...Array(5)].map((_, index) => (
          <Star key={index} filled={index < rating}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1L12.9389 6.95492L19.5106 7.90983L14.7553 12.5451L15.8779 19.0902L10 16L4.12215 19.0902L5.24472 12.5451L0.489435 7.90983L7.06107 6.95492L10 1Z"
                fill={index < rating ? "currentColor" : "none"}
                stroke="currentColor"
              />
            </svg>
          </Star>
        ))}
      </RatingContainer>
    );
  };

  return (
    <TestimonialWrapper>
      <div className="bg-banner">
        <Img src={bgImage} />
      </div>
      <Container>
        <Row className="justify-content-between">
          <Col lg={5} md={6} sm={12} className="content-col">
            <Swiper
              modules={[EffectFade, Pagination]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              spaceBetween={0}
              slidesPerView={1}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
                bulletClass: "custom-bullet",
                bulletActiveClass: "custom-bullet-active",
              }}
              onSwiper={(swiper) => {
                contentSwiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              className="content-swiper"
            >
              {data?.posts?.list?.map((item) => {
                console.log(item?.images?.[0]?.full_path);
                return (
                  <SwiperSlide key={`content-${item.id}`}>
                    <TestimonialContent>
                      <BirdIconWrapper>
                        <BirdIcon1 />
                        <BirdIcon2 />
                      </BirdIconWrapper>

                      <TestimonialText>
                        {item?.data?.description}
                      </TestimonialText>

                      <StarRating rating={item?.data?.rating} />

                      <TestimonialAuthor>
                        <AuthorName>{item?.data?.title}</AuthorName>
                        <AuthorPosition>{item?.data?.title}</AuthorPosition>
                      </TestimonialAuthor>

                      <NavigationControls>
                        <NavButtons>
                          <NavButton
                            onClick={handlePrev}
                            aria-label="Previous testimonial"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M15 18L9 12L15 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </NavButton>
                          <NavButton
                            onClick={handleNext}
                            aria-label="Next testimonial"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 18L15 12L9 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </NavButton>
                        </NavButtons>
                      </NavigationControls>

                      <div className="custom-pagination"></div>
                    </TestimonialContent>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>

          <Col lg={5} md={6} sm={12} className="image-col">
            <Swiper
              modules={[EffectFade]}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => {
                imageSwiperRef.current = swiper;
              }}
              className="image-swiper"
            >
              {data?.posts?.list?.map((item, index) => (
                <SwiperSlide key={`image-${item?.id || index}`}>
                  <ImageContainer>
                    <ImageWrapper>
                      <ResponsiveImage
                        src={item?.images?.[0]?.full_path}
                        alt={item?.data?.title || "Testimonial"}
                        className="testimonial-image"
                      />
                      <ImageOverlay />
                    </ImageWrapper>
                    <TestimonialCounter>
                      <strong>{activeIndex + 1}</strong> /{" "}
                      {data?.posts?.list?.length}
                    </TestimonialCounter>
                  </ImageContainer>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row>
      </Container>

      <BuildingsGraphic className="buildings-graphic" />
    </TestimonialWrapper>
  );
}

// Styled components
const TestimonialWrapper = styled.section`
  padding-top: calc(620 / 1366 * 100%);
  position: relative;
  background-color: #f5f5f5;
  overflow: hidden;

  .bg-banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .container {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 94px;
    z-index: 2;
  }

  @media (max-width: 992px) {
    padding: 100px 0;

    .container {
      position: relative;
      top: 0;
      bottom: 0;
    }
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  .content-col,
  .image-col {
    height: 100%;
  }

  .content-swiper,
  .image-swiper {
    height: 100%;
  }

  .bird-icon {
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(-10deg);
    }
  }

  .custom-pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    @media (min-width: 768px) {
      display: none;
    }
  }

  .custom-bullet {
    width: 10px;
    height: 10px;
    background: #ccc;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .custom-bullet-active {
    background: #333;
    width: 20px;
    border-radius: 5px;
  }
`;

const TestimonialContent = styled.div`
  padding: 0 20px 0 0;
  position: relative;
  z-index: 2;

  @media (max-width: 1200px) {
    padding: 0 10px;
  }

  @media (max-width: 992px) {
    padding: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 40px;
    text-align: center;
  }
`;

const BirdIconWrapper = styled.div`
  margin-bottom: 20px;
  color: #333;

  svg:first-child {
    margin-right: 15px;
    margin-top: -10px;
  }

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

const TestimonialText = styled.p`
  font-size: 18px;
  line-height: 1.7;
  color: #333;
  margin-bottom: 20px;
  max-width: 90%;
  transition: all 0.3s ease;

  @media (max-width: 1200px) {
    font-size: 17px;
    max-width: 100%;
  }

  @media (max-width: 992px) {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    text-align: center;
    font-size: 15px;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Star = styled.span`
  color: ${(props) => (props.filled ? "#FFD700" : "#D3D3D3")};
  margin-right: 5px;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

const TestimonialAuthor = styled.div`
  margin-bottom: 30px;
`;

const AuthorName = styled.h3`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 5px 0;
  color: #333;

  @media (max-width: 992px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const AuthorPosition = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const NavigationControls = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    align-items: center;
  }
`;

const NavButtons = styled.div`
  display: flex;
  margin-bottom: 15px;
`;

const NavButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid #333;
  color: #333;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background: #333;
    color: white;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:active:after {
    transform: scale(2);
    opacity: 0;
    transition: 0s;
  }

  @media (max-width: 768px) {
    width: 45px;
    height: 45px;
  }
`;

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  height: 600px;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

    .testimonial-image {
      transform: scale(1.05);
    }
  }

  @media (max-width: 1200px) {
    max-width: 450px;
    height: 520px;
  }

  @media (max-width: 992px) {
    max-width: 400px;
    height: 480px;
  }

  @media (max-width: 768px) {
    max-width: 350px;
    height: 400px;
    margin-top: 20px;
  }
`;

const ResponsiveImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 2;
`;

const TestimonialCounter = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #333;
  font-size: 14px;
  padding: 5px 15px;
  border-radius: 20px;
  z-index: 3;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    color: white;
  }
`;

const BuildingsGraphic = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-image: url("/buildings-graphic.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right top;
  opacity: 0.4;
  z-index: 1;
  transition: opacity 0.5s ease;

  @media (max-width: 1200px) {
    width: 35%;
    opacity: 0.35;
  }

  @media (max-width: 992px) {
    width: 30%;
    opacity: 0.3;
  }

  @media (max-width: 768px) {
    width: 20%;
    opacity: 0.2;
  }

  &:hover {
    opacity: 0.6;
  }
`;
