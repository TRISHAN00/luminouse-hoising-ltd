"use client";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Title from "../Title";
// Import Swiper styles
import { useRef } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import TeamCard from "./TeamCard";

export default function Team({ teamMembers, title = "OUR TEAM", titleColor = "#171717", titleFontSize = "60", autoplay = true, speed = 3000 }) {
  // Reference to the Swiper instance
  const swiperRef = useRef(null);
  
  // Default team members if none are provided
  const members = teamMembers || [
    {
      id: 1,
      name: "Eng. A.K.M Liaqat Ali",
      position: "Engineer",
      image: "/images/dynamic/about/team-01.jpg"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Project Manager",
      image: "/images/dynamic/about/team-02.jpg"
    },
    {
      id: 3,
      name: "David Chen",
      position: "Architect",
      image: "/images/dynamic/about/team-03.jpg"
    },
    {
      id: 4,
      name: "Amina Khan",
      position: "Interior Designer",
      image: "/images/dynamic/about/team-04.jpg"
    },
    {
      id: 5,
      name: "Robert Williams",
      position: "Construction Manager",
      image: "/images/dynamic/about/team-01.jpg"
    },
    {
      id: 6,
      name: "Maria Rodriguez",
      position: "Finance Director",
      image: "/images/dynamic/about/team-02.jpg"
    }
  ];

  // Responsive breakpoints for Swiper
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 50
    }
  };

  // Autoplay configuration
  const autoplayConfig = autoplay ? {
    delay: speed,
    disableOnInteraction: false,
    pauseOnMouseEnter: true
  } : false;

  return (
    <TeamStyled>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="team-title">
              <Title
                center
                color={titleColor}
                fontSize={titleFontSize}
                text={title}
              />
            </div>
          </Col>
          <Col lg={12}>
            <div className="swiper-container">
              <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={4}
                breakpoints={breakpoints}
                autoplay={autoplayConfig}
                speed={1000} // Transition speed in ms
                loop={true}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                pagination={{
                  el: '.swiper-pagination',
                  clickable: true,
                  type: 'bullets',
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className="team-swiper"
              >
                {members.map((member) => (
                  <SwiperSlide key={member.id}>
                    <TeamCard
                      name={member.name}
                      position={member.position}
                      image={member.image}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </TeamStyled>
  );
}

const TeamStyled = styled.section`
  padding: 120px 0;

  .team-title {
    margin-bottom: 80px;
  }
  
  .swiper-container {
    position: relative;
    padding-bottom: 60px;
  }
  
  .team-swiper {
    width: 100%;
  }
  
  .swiper-navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
  }
  
  .swiper-button-prev,
  .swiper-button-next {
    position: relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f5f5f5;
    transition: all 0.3s ease;
    color: #171717;
    margin: 0 15px;
    
    &:hover {
      background-color: #171717;
      color: white;
    }
    
    &:after {
      font-size: 18px;
    }
  }
  
  .swiper-pagination {
    position: relative;
    width: auto;
    
    .swiper-pagination-bullet {
      width: 10px;
      height: 10px;
      background-color: #ccc;
      opacity: 1;
      transition: all 0.3s ease;
      
      &-active {
        background-color: #171717;
        width: 30px;
        border-radius: 5px;
      }
    }
  }

  @media (max-width: 1199px) {
    padding: 100px 0;
    
    .team-title {
      margin-bottom: 60px;
    }
  }

  @media (max-width: 991px) {
    padding: 80px 0;
    
    .team-title {
      margin-bottom: 50px;
    }
    
    .swiper-container {
      padding-bottom: 50px;
    }
  }

  @media (max-width: 767px) {
    padding: 60px 0;
    
    .team-title {
      margin-bottom: 40px;
    }
    
    .swiper-button-prev,
    .swiper-button-next {
      width: 35px;
      height: 35px;
      margin: 0 10px;
      
      &:after {
        font-size: 16px;
      }
    }
  }

  @media (max-width: 575px) {
    padding: 50px 0;
    
    .team-title {
      margin-bottom: 30px;
    }
    
    .swiper-container {
      padding-bottom: 40px;
    }
    
    .swiper-navigation {
      flex-wrap: wrap;
    }
    
    .swiper-pagination {
      order: -1;
      width: 100%;
      margin-bottom: 15px;
    }
    
    .swiper-button-prev,
    .swiper-button-next {
      width: 30px;
      height: 30px;
      
      &:after {
        font-size: 14px;
      }
    }
  }
`;