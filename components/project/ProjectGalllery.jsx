"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Title from "../Title";

// Import the core lightgallery styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// Import lightgallery and plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";

export default function ProjectGallery({ data }) {
  // For SSR compatibility
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to determine aspect ratio based on image dimensions
  const getAspectRatio = (dimension) => {
    if (!dimension || dimension === "x") return "1/1";

    const [width, height] = dimension.split("x").map(Number);
    if (!width || !height) return "1/1";

    const ratio = width / height;

    // Define ratio categories
    if (ratio > 1.7) return "16/9"; // Wide landscape
    if (ratio > 1.4) return "3/2"; // Medium landscape
    if (ratio > 1.1) return "4/3"; // Standard landscape
    if (ratio > 0.9) return "1/1"; // Square-ish
    if (ratio > 0.7) return "3/4"; // Portrait
    return "3/4"; // Tall portrait
  };

  // Transform API data into gallery items
  const galleryItems =
    data?.images?.map((image, index) => ({
      id: image.id,
      src: image.full_path,
      alt: image.img_alt || `Gallery Image ${index + 1}`,
      ratio: getAspectRatio(image.dimension),
      dimension: image.dimension,
    })) || [];

  // Helper function to handle image paths
  const getImagePath = (img) => {
    if (!img) return "";
    return img.src || img;
  };

  return (
    <ProjectGalleryStyled>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="gallery-title">
              <Title
                center
                color={"#5B5B5B"}
                fontSize={"60"}
                text={data?.data?.title || "GALLERY"}
              />
            </div>
          </Col>
          <Col lg={12}>
            {mounted && galleryItems.length > 0 && (
              <LightGallery
                elementClassNames="masonry-gallery"
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                mode="lg-fade"
              >
                {galleryItems.map((item) => {
                  return (
                    <a
                      href={getImagePath(item.src)}
                      key={item.id}
                      className="gallery-item"
                      data-ratio={item.ratio}
                    >
                      <img
                        src={getImagePath(item.src)}
                        alt={item.alt}
                        className="img-responsive"
                        loading="lazy"
                      />
                    </a>
                  );
                })}
              </LightGallery>
            )}
            {(!galleryItems || galleryItems.length === 0) && (
              <div className="no-images">
                <p>No gallery images available.</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </ProjectGalleryStyled>
  );
}

const ProjectGalleryStyled = styled.section`
  padding: 150px 0;
  overflow: hidden;

  /* Tablet desktop :768px. */
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 100px 0px;
  }

  /* small mobile :320px. */
  @media (max-width: 767px) {
    padding: 80px 0px;
  }

  .gallery-title {
    margin-bottom: 40px;
  }

  .no-images {
    text-align: center;
    padding: 40px;
    color: #999;
    font-size: 18px;
  }

  .masonry-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 10px;
    grid-gap: 15px;

    .gallery-item {
      display: block;
      overflow: hidden;
      border-radius: 8px;
      grid-row-end: span 25; /* Default height */
      transition: transform 0.3s ease;
      cursor: pointer;
      position: relative;

      &[data-ratio="1/1"] {
        grid-row-end: span 25;
      }

      &[data-ratio="4/3"] {
        grid-row-end: span 20;
      }

      &[data-ratio="3/4"] {
        grid-row-end: span 30;
      }

      &[data-ratio="16/9"] {
        grid-row-end: span 15;
      }

      &[data-ratio="3/2"] {
        grid-row-end: span 18;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
      }

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

        img {
          transform: scale(1.05);
        }
      }
    }
  }

  @media (max-width: 768px) {
    .masonry-gallery {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      grid-gap: 10px;
    }
  }

  @media (max-width: 576px) {
    .masonry-gallery {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 8px;
    }
  }
`;
