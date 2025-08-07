"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import styled from "styled-components";

import Image from "next/image";
import { Container } from "react-bootstrap";
import Line from "./Lines";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ImageCollageSection = ({ data, projectData }) => {
  const large = data?.images?.list?.find((f) => f.large === "on");
  const medium = data?.images?.list?.find((f) => f.medium === "on");
  const small = data?.images?.list?.find((f) => f.small === "on");

  const large2 = projectData?.images?.find((f) => f.large === "on");
  const medium2 = projectData?.images?.find((f) => f.medium === "on");
  const small2 = projectData?.images?.find((f) => f.small === "on");

  const sectionRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === "undefined") return;

    const section = sectionRef.current;

    // Initialize animations only when elements are available
    if (!section || !img1Ref.current || !img2Ref.current || !img3Ref.current)
      return;

    // Check if we're on mobile
    const isMobile = window.innerWidth < 768;

    // Clean up any existing ScrollTrigger instances
    const cleanUp = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    // Create separate context for this component's animations
    const ctx = gsap.context(() => {
      // Only apply parallax on non-mobile devices
      if (!isMobile) {
        // Parallax for image 1
        gsap.to(img1Ref.current, {
          y: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        // Parallax for image 2
        gsap.to(img2Ref.current, {
          y: "25%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        // Parallax for image 3
        gsap.to(img3Ref.current, {
          y: "-15%",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    // Handle resize events to re-initialize animations if needed
    const handleResize = () => {
      const wasDesktop = !isMobile;
      const isDesktop = window.innerWidth >= 768;

      // Only re-init if we crossed the mobile/desktop threshold
      if (wasDesktop !== isDesktop) {
        cleanUp();
        ctx.revert();
        // Re-create the animations
        setTimeout(() => {
          ctx.add(() => {
            if (isDesktop) {
              // Re-apply desktop animations
              gsap.to(img1Ref.current, {
                y: "-20%",
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.5,
                },
              });

              gsap.to(img2Ref.current, {
                y: "25%",
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 2,
                },
              });

              gsap.to(img3Ref.current, {
                y: "-15%",
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              });
            }
          });
        }, 200);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      cleanUp();
      ctx.revert();
    };
  }, []);

  return (
    <div>
      <Wrapper ref={sectionRef}>
        <Line background={"#1717171a"} />
        <Container className="collage-container">
          {(large || large2) && (
            <div className="image-layer image-1">
              <div className="image-wrapper" ref={img1Ref}>
                <Image
                  src={(large?.full_path || large2?.full_path) ?? ""}
                  alt="Room 1"
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 500px"
                  priority
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {(medium || medium2) && (
            <div className="image-layer image-2">
              <div className="image-wrapper" ref={img2Ref}>
                <Image
                  src={(medium?.full_path || medium2?.full_path) ?? ""}
                  alt="Room 2"
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 350px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {(small || small2) && (
            <div className="image-layer image-3">
              <div className="image-wrapper" ref={img3Ref}>
                <Image
                  src={(small?.full_path || small2?.full_path) ?? ""}
                  alt="Outside View"
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}
        </Container>
      </Wrapper>
    </div>
  );
};

export default ImageCollageSection;

const Wrapper = styled.section`
  position: relative;
  overflow: hidden;
  margin-top: -190px;
  background-color: #f7f7f7;
  height: 800px;

  /* Tablet desktop :768px. */
  @media (min-width: 768px) and (max-width: 991px) {
    display: none;
  }

  &:before {
    position: absolute;
    content: "";
    background-color: #171717;
    height: 40%;
    top: 0;
    left: 0;
    right: 0;
  }

  .collage-container {
    position: relative;
    height: 100%;
  }

  .image-layer {
    position: absolute;
    overflow: hidden;
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .image-1 {
    top: 5%;
    left: 15%;
    height: 600px;
    width: 500px;
    z-index: 1;
  }

  .image-2 {
    top: 50%;
    left: 35%;
    height: 300px;
    width: 350px;
    z-index: 3;
  }

  .image-3 {
    top: 15%;
    right: 30%;
    width: 450px;
    height: 400px;
    z-index: 2;
  }

  /* Large Desktops */
  @media (min-width: 1200px) and (max-width: 1500px) {
    height: 800px;

    .image-1 {
      height: 700px;
      width: 600px;
    }

    .image-2 {
      height: 350px;
      width: 400px;
    }

    .image-3 {
      width: 550px;
      height: 450px;
      right: 10%;
    }
  }

  /* Large tablets and small desktops */
  @media (min-width: 992px) and (max-width: 1200px) {
    height: 800px;
    margin-top: -120px;

    .image-1 {
      top: 10%;
      left: 15%;
      height: 500px;
      width: 400px;
    }

    .image-2 {
      top: 40%;
      left: 35%;
      height: 280px;
      width: 320px;
    }

    .image-3 {
      top: 15%;
      right: 15%;
      width: 380px;
      height: 350px;
    }
  }

  /* Medium tablets */
  @media (max-width: 992px) {
    height: 700px;

    .image-1 {
      top: 15%;
      left: 0;
      height: 400px;
      width: 350px;
    }

    .image-2 {
      top: 35%;
      left: 32%;
      height: 250px;
      width: 290px;
    }

    .image-3 {
      top: 10%;
      right: 0;
      width: 330px;
      height: 300px;
    }
  }

  /* Small tablets and large phones */
  @media (max-width: 768px) {
    height: auto;
    padding: 4rem 0;

    .collage-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .image-layer {
      position: relative;
      width: 100%;
      max-width: 500px;
      height: 350px;
      margin: 0 auto;
    }

    .image-1,
    .image-2,
    .image-3 {
      top: unset;
      left: unset;
      right: unset;
      width: 100%;
      height: 350px;
    }
  }

   @media (max-width: 768px) {
    margin-top: -140px;
   }

  /* Small phones */
  @media (max-width: 576px) {
    padding: 3rem 0;

    .image-layer {
      height: 250px;
    }

    .image-1,
    .image-2,
    .image-3 {
      height: 250px;
    }
  }
`;
