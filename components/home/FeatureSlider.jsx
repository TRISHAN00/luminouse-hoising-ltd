"use client";

import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import project1 from "../../public/images/dynamic/projects/project-01.jpg";
import project2 from "../../public/images/dynamic/projects/project-02.jpg";
import project3 from "../../public/images/dynamic/projects/project-03.jpg";

// Import Swiper styles
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import Line from "../Lines";
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
      <Line background={'#1717171a'} />
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
              <Line/>
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
              <Link href={'/'} >
                <ProjectItem>
                  <ImageContainer>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <CircleButton>
                      <span>+</span>
                    </CircleButton>
                  </ImageContainer>

                  <ProjectInfo>
                    <h3>{project.title}</h3>
                    <p>{project.location}</p>
                  </ProjectInfo>
                </ProjectItem>
              </Link>
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

const ProjectItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 133.33%; /* Aspect ratio matching the image */
  overflow: hidden;
`;

const CircleButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;

  span {
    font-size: 24px;
    color: #333;
    line-height: 1;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background-color: #262626;

    span {
      color: white;
    }
  }
`;

const ProjectInfo = styled.div`
  padding: 24px;
  background-color: white;
  border-top: none;

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: #222;
    margin: 0 0 5px 0;
    transition: color 0.3s ease;
  }

  p {
    font-size: 14px;
    color: #777;
    margin: 0;
  }

  ${ProjectItem}:hover & {
    h3 {
      color: #262626;
    }
  }
`;
