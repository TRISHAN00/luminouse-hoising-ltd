"use client";

import { Col, Container, Row } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import project1 from "../../public/images/dynamic/projects/project-01.jpg";
import project2 from "../../public/images/dynamic/projects/project-02.jpg";
import project3 from "../../public/images/dynamic/projects/project-03.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import Line from "../Lines";
import ProjectCard from "../ProjectCard";
import Title from "../Title";

// Projects data matching the example image
const projects = [
  {
    id: 1,
    title: "Luminous Jesmin Tower",
    location: "Dhanmondi, Dhaka",
    image: project1,
    detailImage: project1,
  },
  {
    id: 2,
    title: "Luminous Hamid Heights",
    location: "Oxygen More, Chittagong",
    image: project2,
    detailImage: project2,
  },
  {
    id: 3,
    title: "Luminous Harmony",
    location: "Banani, Dhaka",
    image: project3,
    detailImage: project3,
  },
  {
    id: 4,
    title: "Luminous Jesmin Tower",
    location: "Dhanmondi, Dhaka",
    image: project1,
    detailImage: project1,
  },
  // Add more projects as needed
];

export default function FeatureSlider() {
  return (
    <SliderSection>
      <Line background={"#1717171a"} />
      <Container>
        <Row>
          <Col className="feature-title" lg={{ offset: 2, span: 8 }}>
            <Title
              center
              color={"#5B5B5B"}
              fontSize={"60"}
              text={"DISCOVER OUR EXCLUSIVE CREATION OF FEATURED PROJECTS"}
            />
          </Col>
        </Row>
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
          {projects.map((project) => (
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
