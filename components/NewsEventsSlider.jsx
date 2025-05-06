"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import newImage from '../public/images/dynamic/about/team-01.jpg';

// Import Swiper styles
import { Col, Container, Row } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import Line from "./Lines";
import Title from "./Title";
import NewsCard from "./news/NewsCard";

export default function NewsEventsSlider() {
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // News data
  const newsItems = [
    {
      id: 1,
      title: "Luxury Residential Project",
      image: newImage, 
      date: "22 January 2025",
      category: "News",
      slug: "luxury-residential-project",
    },
    {
      id: 2,
      title: "Grand Handover Ceremony for Premium Apartment Complex",
      image: newImage, 
      date: "31 January 2025",
      category: "News",
      slug: "premium-apartment-complex",
    },
    {
      id: 3,
      title: "Luminous Housings Expands into Commercial Real Estate",
      image: newImage, 
      date: "05 March 2025",
      category: "News",
      slug: "commercial-real-estate",
    },
    {
      id: 4,
      title: "New Sustainable Building Practices Implemented",
      image: newImage, 
      date: "12 April 2025",
      category: "News",
      slug: "sustainable-building-practices",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent hydration errors by not rendering until client-side
  }

  return (
    <SliderSection>
      <Line background={"#1717171a"} />
      <Container>
        <Row>
          <Col lg={12}>
            <SliderHeader>
              <Title
                textAlign={"left"}
                color={"#5B5B5B"}
                fontSize={"60"}
                text={"NEWS & EVENTS"}
              />
              <NavigationContainer className="d-flex">
                <NavigationButton ref={prevRef} className="prev-arrow-news">
                  <MdKeyboardArrowLeft />
                </NavigationButton>
                <NavigationButton ref={nextRef} className="next-arrow-news">
                  <MdKeyboardArrowRight />
                </NavigationButton>
              </NavigationContainer>
            </SliderHeader>
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            <SwiperContainer
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              speed={600} // smoother transition (adjust as needed)
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              slidesPerView={1}
              spaceBetween={30}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {newsItems?.map((item) => {
                return (
                  <SwiperSlide key={item.id}>
                    <NewsCard item={item} />
                  </SwiperSlide>
                );
              })}
            </SwiperContainer>
          </Col>
        </Row>
      </Container>
    </SliderSection>
  );
}

const NavigationContainer = styled.div`
  display: flex;
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

// Styled Components
const SliderSection = styled.section`
  padding: 200px 0;
  position: relative;
  padding: 4rem 1rem;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const SwiperContainer = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;