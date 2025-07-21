"use client";

import { Col, Container, Row } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Line from "../Lines";
import ProjectCard from "../ProjectCard";
import Title from "../Title";

export default function FeatureSlider({ title, featuredProjects }) {
  const findFeaturedProject = featuredProjects?.data?.filter(
    (project) => project?.product_data?.is_featured === 1
  );

  return (
    <SliderSection>
      <Line background={"#1717171a"} />
      <Container>
        <Row>
          <Col className="feature-title" lg={{ offset: 2, span: 8 }}>
            {title?.section_data?.subtitle && (
              <Title
                center
                color={"#5B5B5B"}
                fontSize={"60"}
                text={title?.section_data?.subtitle}
              />
            )}
          </Col>
        </Row>
        {findFeaturedProject?.length > 3 && (
          <Row>
            <Line />
            <Col>
              <NavigationContainer className="d-flex">
                <NavigationButton className="prev-arrow">
                  <MdKeyboardArrowLeft />
                </NavigationButton>
                <NavigationButton className="next-arrow">
                  <MdKeyboardArrowRight />
                </NavigationButton>
              </NavigationContainer>
            </Col>
          </Row>
        )}

        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            nextEl: ".next-arrow",
            prevEl: ".prev-arrow",
          }}
          speed={600} // smoother transition (adjust as needed)
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          className="projects-swiper"
        >
          {findFeaturedProject?.map((project) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </SliderSection>
  );
}

const SliderSection = styled.section`
  position: relative;
  padding: 0;
  background-color: #f7f7f7;
  padding: 120px 0px;
  overflow: hidden;

  .feature-title {
    margin-bottom: 80px;
  }

  .projects-swiper {
    .swiper-slide {
      border-right: 1px solid #f0f0f0;

      &:last-child {
        border-right: none;
      }
    }
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  gap: 20px;
`;

const NavigationButton = styled.div`
  border: 1px solid #262626;
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: transparent;
  color: #262626;

  svg {
    font-size: 24px;
    transition: all 0.3s ease;
  }

  &:hover {
    background-color: #262626;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(12, 90, 219, 0.2);
  }

  &.swiper-button-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
      color: #262626;
      transform: translateY(0);
      box-shadow: none;
    }
  }
`;
