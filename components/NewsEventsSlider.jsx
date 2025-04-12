"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import project1 from "@/public/images/dynamic/projects/project-02.jpg";

// Import Swiper styles
import { title } from "@/styles/globalStyleVars";
import { Col, Container, Row } from "react-bootstrap";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "swiper/css";
import "swiper/css/navigation";
import Line from "./Lines";

export default function NewsEventsSlider() {
  const [mounted, setMounted] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // News data
  const newsItems = [
    {
      id: 1,
      title: "Luminous Housings Unveils New Luxury Residential Project",
      imagePath: project1, // Replace with your image path
      date: "22 January 2025",
      category: "News",
      slug: "luxury-residential-project",
    },
    {
      id: 2,
      title: "Grand Handover Ceremony for Premium Apartment Complex",
      imagePath: project1, // Replace with your image path
      date: "31 January 2025",
      category: "News",
      slug: "premium-apartment-complex",
    },
    {
      id: 3,
      title: "Luminous Housings Expands into Commercial Real Estate",
      imagePath: project1, // Replace with your image path
      date: "05 March 2025",
      category: "News",
      slug: "commercial-real-estate",
    },
    {
      id: 4,
      title: "New Sustainable Building Practices Implemented",
      imagePath: project1, // Replace with your image path
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
              <Heading>NEWS & EVENTS</Heading>
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
              {newsItems.map((item) => (
                <SwiperSlide key={item.id}>
                  <NewsCard>
                    <Link href={`/news/${item.slug}`} passHref>
                      <CardContent>
                        <ImageWrapper>
                          <ImageContainer>
                            <Image
                              src={item.imagePath}
                              alt={item.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <DarkOverlay />
                          </ImageContainer>
                          <WhiteOverlay />
                        </ImageWrapper>

                        <CardInfo>
                          <CardTitle>{item.title}</CardTitle>
                          <CardFooter>
                            <DateNumber>{item.date.split(" ")[0]}</DateNumber>
                            <DateInfo>
                              <DateMonth>
                                {item.date.split(" ")[1]}{" "}
                                {item.date.split(" ")[2]}
                              </DateMonth>
                              <CardCategory>{item.category}</CardCategory>
                            </DateInfo>
                          </CardFooter>
                        </CardInfo>
                      </CardContent>
                    </Link>
                  </NewsCard>
                </SwiperSlide>
              ))}
            </SwiperContainer>
          </Col>
        </Row>
      </Container>
    </SliderSection>
  );
}

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

// Styled Components
const SliderSection = styled.section`
  padding: 200px 0;
  position: relative;
  height: 100dvh;
  padding: 4rem 1rem;
`;

const SliderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Heading = styled.h2`
  font-family: ${title};
  font-size: 3.5rem;
  font-weight: 400;
  color: #333;
  letter-spacing: 0.03em;
`;

const NavigationControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const SwiperContainer = styled(Swiper)`
  width: 100%;
  height: 100%;

  .swiper-button-disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const NewsCard = styled.article`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  position: relative;
`;

const CardInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
  color: #333;
  transition: color 0.3s ease;

  ${NewsCard}:hover & {
    color: white;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 620px;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: scale(1);
  transition: transform 0.7s ease;

  ${NewsCard}:hover & {
    transform: scale(1.05);
  }
`;

const WhiteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  transition: transform 0.5s ease;
  z-index: 2;

  ${NewsCard}:hover & {
    transform: translateY(100%);
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const DateNumber = styled.span`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  color: #000;
  transition: color 0.3s ease;

  ${NewsCard}:hover & {
    color: white;
  }
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DateMonth = styled.span`
  font-size: 0.9rem;
  color: #666;
  transition: color 0.3s ease;

  ${NewsCard}:hover & {
    color: white;
  }
`;

const CardCategory = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
  transition: color 0.3s ease;

  ${NewsCard}:hover & {
    color: white;
  }
`;
