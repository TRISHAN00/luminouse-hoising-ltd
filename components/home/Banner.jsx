"use client";

import gsap from "gsap";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  /* Smooth easing */
  .swiper-wrapper {
    transition-timing-function: ease-in-out !important;
  }

  /* GPU acceleration */
  .swiper-slide {
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);
  }
`;

const SlideWrapper = styled.div`
  will-change: transform;
  backface-visibility: hidden;
  perspective: 1000px;
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
  margin: 0 auto;
  text-transform: uppercase;

  h1 {
    font-size: 72px;
    line-height: 1.2;
    text-align: center;
    color: white;
    white-space: pre-line;
    font-weight: 800;
    max-width: 50%;
    font-family: "Playfair Display", serif;
    letter-spacing: 1px;

    /* Tablet desktop :768px. */
    @media (min-width: 768px) and (max-width: 991px) {
      max-width: 90%;
    }

    /* small mobile :320px. */
    @media (max-width: 767px) {
      max-width: 90%;
    }
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

  /* Tablet desktop :768px. */
  @media (min-width: 768px) and (max-width: 991px) {
    display: none;
  }

  /* small mobile :320px. */
  @media (max-width: 767px) {
    display: none;
  }
`;

const Arrow = styled.button`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
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
    background: rgba(0, 0, 0, 0.4);
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

  a {
    color: aliceblue;
    text-transform: uppercase;
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

export default function HomeBanner({ data = [] }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const swiperRef = useRef(null);
  const titleRefs = useRef([]);
  const imageRefs = useRef([]);
  const overlayRefs = useRef([]);

  // Set up refs for each slide
  useEffect(() => {
    if (data?.length) {
      titleRefs.current = titleRefs.current.slice(0, data.length);
      imageRefs.current = imageRefs.current.slice(0, data.length);
      overlayRefs.current = overlayRefs.current.slice(0, data.length);
    }
  }, [data?.length]);

  // Helper function to safely get text content from HTML or plain text
  const getTextContent = (content) => {
    if (!content) return "";

    // If it's already plain text, return it
    if (typeof content === "string" && !content.includes("<")) {
      return content;
    }

    // If it contains HTML, strip the tags to get plain text
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  // Animate the active slide
  const animateSlide = (index) => {
    if (!data?.length || !titleRefs.current[index]) return;

    // Create a timeline for coordinated animations
    const tl = gsap.timeline({
      onComplete: () => setIsTransitioning(false),
    });

    // First hide previous elements if needed
    if (titleRefs.current[activeSlide] && index !== activeSlide) {
      gsap.set(
        titleRefs.current[activeSlide].querySelectorAll(".reveal-line"),
        {
          y: "100%",
        }
      );
    }

    // Setup the new slide elements initial state
    if (
      titleRefs.current[index] &&
      (data[index]?.data?.title || data[index]?.data?.description)
    ) {
      // Clear previous content
      titleRefs.current[index].innerHTML = "";

      // Get the text content (use title first, then description as fallback)
      const titleText = getTextContent(
        data[index]?.data?.title || data[index]?.data?.description || ""
      );

      if (titleText) {
        // Create lines
        const lines = titleText
          .split("\n")
          .filter((line) => line.trim() !== "");

        lines.forEach((line) => {
          const lineDiv = document.createElement("div");
          lineDiv.className = "title-line";

          const revealSpan = document.createElement("span");
          revealSpan.className = "reveal-line";
          revealSpan.textContent = line.trim();

          lineDiv.appendChild(revealSpan);
          titleRefs.current[index].appendChild(lineDiv);
        });
      }

      // Image animation
      if (imageRefs.current[index]) {
        tl.fromTo(
          imageRefs.current[index],
          { scale: 1.1, opacity: 0.8 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          0
        );
      }

      // Overlay animation
      if (overlayRefs.current[index]) {
        tl.fromTo(
          overlayRefs.current[index],
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      // Text animation
      const revealLines =
        titleRefs.current[index].querySelectorAll(".reveal-line");
      if (revealLines.length > 0) {
        tl.to(
          revealLines,
          {
            y: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.15,
          },
          0.4
        );
      }
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

  // Pre-render all data to avoid blinking
  useEffect(() => {
    // Only animate on first load when data is available
    if (data?.length && titleRefs.current[activeSlide]) {
      setIsTransitioning(true);
      animateSlide(activeSlide);
    }
  }, [data?.length]);

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

  // Early return if no data
  if (!data?.length) {
    return (
      <BannerContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            color: "white",
            fontSize: "24px",
          }}
        >
          Loading...
        </div>
      </BannerContainer>
    );
  }

  return (
    <BannerContainer>
      <Swiper
        ref={swiperRef}
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        speed={1500}
        loop={data.length > 1}
        autoplay={
          data.length > 1
            ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        allowTouchMove={!isTransitioning}
        onSlideChange={handleSlideChange}
        onSwiper={(swiper) => {
          setTimeout(() => {
            animateSlide(swiper.realIndex);
          }, 100);
        }}
        className="banner-swiper"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={item?.data?.id || index}>
              <SlideWrapper>
                <ImageWrapper ref={(el) => (imageRefs.current[index] = el)}>
                  {item?.images?.[0]?.full_path && (
                    <Image
                      src={item.images[0].full_path}
                      alt={
                        item?.data?.title ||
                        item?.data?.description ||
                        "Banner image"
                      }
                      fill
                      style={{ objectFit: "cover", zIndex: 0 }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  )}
                </ImageWrapper>
                <TitleContainer>
                  <h1 ref={(el) => (titleRefs.current[index] = el)}>
                    {/* This will be populated by the animateSlide function */}
                  </h1>
                </TitleContainer>
                <Overlay ref={(el) => (overlayRefs.current[index] = el)} />
              </SlideWrapper>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {data.length > 1 && (
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
      )}

      {/* <TabsContainer>
        <Tab
            key={0}
            
            disabled={isTransitioning}
          >
            <Link href={`/projects?status=ongoing`} >Ongoing</Link>
          </Tab>
          <Tab
            key={1}
            
            disabled={isTransitioning}
          >
            <Link href={`/projects?status=upcoming`} >Upcoming</Link>
          </Tab>
          <Tab
            key={2}
            
            disabled={isTransitioning}
          >
            <Link href={`/projects?status=completed`} >Completed</Link>
          </Tab>
      </TabsContainer> */}
    </BannerContainer>
  );
}
