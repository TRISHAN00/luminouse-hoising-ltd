"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import homeImage1 from "../../public/images/dynamic/home/banner-01.jpg";
import homeImage2 from "../../public/images/dynamic/home/banner-02.jpg";
import homeImage3 from "../../public/images/dynamic/home/banner-03.jpg";

// Slide data
const slides = [
  {
    id: 1,
    image: homeImage1,
    title: "CRAFTING HOMES,\nBUILDING DREAMS",
  },
  {
    id: 2,
    image: homeImage2,
    title: "DESIGNING COMFORT,\nDELIVERING VALUE",
  },
  {
    id: 3,
    image: homeImage3,
    title: "INNOVATION MEETS\nARCHITECTURE",
  },
];

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const SlideWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  opacity: 1;
  transition: opacity 0.3s ease-out;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const TitleContainer = styled.div`
  position: absolute;
  z-index: 2;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    font-size: 72px;
    line-height: 1.2;
    text-align: center;
    color: white;
    white-space: pre-line;
    font-weight: 300;
    max-width: 90%;
    font-family: "Playfair Display", serif;
    letter-spacing: 1px;
  }

  .title-line {
    overflow: hidden;
    display: block;
  }

  .reveal-line {
    transform: translateY(100%);
    display: inline-block;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 40px;
    }
  }
`;

const NavigationArrows = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 3;
`;

const Arrow = styled.button`
  background: transparent;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  svg {
    width: 24px;
    height: 24px;
    stroke: white;
    stroke-width: 2;
  }

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "scale(1.1)")};
  }
`;

const TabsContainer = styled.div`
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: flex;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  overflow: hidden;
`;

const Tab = styled.button`
  background: transparent;
  border: none;
  color: white;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: white;
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: center;
  }

  &.active {
    background: rgba(255, 255, 255, 0.1);
    &:after {
      transform: scaleX(1);
    }
  }

  @media (max-width: 767px) {
    font-size: 12px;
    padding: 12px 15px;
  }
`;

export default function HomeBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef(null);
  const titleRefs = useRef([]);
  const imageRefs = useRef([]);
  const overlayRefs = useRef([]);

  // Set up refs for each slide
  useEffect(() => {
    titleRefs.current = titleRefs.current.slice(0, slides.length);
    imageRefs.current = imageRefs.current.slice(0, slides.length);
    overlayRefs.current = overlayRefs.current.slice(0, slides.length);
  }, []);

  // Animate the active slide
  const animateSlide = (index) => {
    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false),
    });

    // First hide previous elements if needed
    if (titleRefs.current[activeSlide] && index !== activeSlide) {
      gsap.set(titleRefs.current[activeSlide].querySelectorAll('.reveal-line'), {
        y: '100%',
      });
    }

    // Setup the new slide elements initial state
    if (titleRefs.current[index]) {
      // Clear previous content
      titleRefs.current[index].innerHTML = "";

      // Create lines
      const titleText = slides[index].title;
      const lines = titleText.split("\n");

      lines.forEach((line) => {
        const lineDiv = document.createElement("div");
        lineDiv.className = "title-line";

        const revealSpan = document.createElement("span");
        revealSpan.className = "reveal-line";
        revealSpan.textContent = line;

        lineDiv.appendChild(revealSpan);
        titleRefs.current[index].appendChild(lineDiv);
      });

      // Image animation
      tl.fromTo(
        imageRefs.current[index],
        { scale: 1.1, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
        0
      );

      // Overlay animation
      tl.fromTo(
        overlayRefs.current[index],
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        0.2
      );

      // Text animation
      tl.to(
        titleRefs.current[index].querySelectorAll('.reveal-line'),
        {
          y: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.15,
        },
        0.4
      );
    }
  };

  // Handle slide change
  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveSlide(newIndex);
    setIsTransitioning(true);
    
    // Small delay to ensure DOM updates before animation
    setTimeout(() => {
      animateSlide(newIndex);
    }, 50);
  };

  // Pre-render all slides to avoid blinking
  useEffect(() => {
    // Only animate on first load
    if (titleRefs.current[activeSlide]) {
      setIsTransitioning(true);
      animateSlide(activeSlide);
    }
  }, []);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper && !isTransitioning) {
      setIsTransitioning(true);
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper && !isTransitioning) {
      setIsTransitioning(true);
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <BannerContainer>
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        speed={1000}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        allowTouchMove={!isTransitioning}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          // Initial animation for the first slide
          setTimeout(() => {
            animateSlide(swiper.realIndex);
          }, 100);
        }}
        onTouchStart={(e) => {
          if (isTransitioning) e.preventDefault();
        }}
        className="banner-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <SlideWrapper>
              <ImageWrapper
                ref={(el) => (imageRefs.current[index] = el)}
              >
                <Image
                  src={slide.image}
                  alt={`Luxury home design ${index + 1}`}
                  fill
                  style={{ objectFit: "cover", zIndex: 0 }}
                  priority
                  loading="eager"
                />
              </ImageWrapper>
              <TitleContainer>
                <h1 ref={(el) => (titleRefs.current[index] = el)}>
                  {/* Content generated dynamically in animateSlide */}
                </h1>
              </TitleContainer>
              <Overlay ref={(el) => (overlayRefs.current[index] = el)} />
            </SlideWrapper>
          </SwiperSlide>
        ))}
      </Swiper>

      <NavigationArrows>
        <Arrow 
          onClick={handlePrev} 
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Arrow>
        <Arrow 
          onClick={handleNext} 
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19M19 12L12 5M19 12L12 19"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Arrow>
      </NavigationArrows>

      <TabsContainer>
        {["Ongoing", "Upcoming", "Completed"].map((tab) => (
          <Tab
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
            disabled={isTransitioning}
          >
            {tab}
          </Tab>
        ))}
      </TabsContainer>
    </BannerContainer>
  );
}