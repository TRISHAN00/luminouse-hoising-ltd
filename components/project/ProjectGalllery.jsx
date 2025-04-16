"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import gallery1 from '../../public/images/dynamic/home/banner-01.jpg';
import gallery2 from '../../public/images/dynamic/home/banner-02.jpg';
import gallery3 from '../../public/images/dynamic/home/build-dream-01.jpg';
import Title from "../Title";

// Import the core lightgallery styles
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// Import lightgallery and plugins
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";

// Sample gallery items - replace with your actual images
const galleryItems = [
  { id: 1, src: gallery1, alt: "Gallery Image 1", ratio: "4/3" },
  { id: 2, src: gallery2, alt: "Gallery Image 2", ratio: "1/1" },
  { id: 3, src: gallery3, alt: "Gallery Image 3", ratio: "3/4" },
  { id: 4, src: gallery2, alt: "Gallery Image 4", ratio: "16/9" },
  { id: 5, src: gallery3, alt: "Gallery Image 5", ratio: "1/1" },
  { id: 6, src: gallery2, alt: "Gallery Image 6", ratio: "3/2" },
  { id: 7, src: gallery3, alt: "Gallery Image 1", ratio: "4/3" },
  { id: 8, src: gallery2, alt: "Gallery Image 2", ratio: "1/1" },
  { id: 9, src: gallery1, alt: "Gallery Image 3", ratio: "3/4" },
  { id: 10, src: gallery2, alt: "Gallery Image 4", ratio: "16/9" },
  { id: 11, src: gallery3, alt: "Gallery Image 5", ratio: "1/1" },
  { id: 12, src: gallery2, alt: "Gallery Image 6", ratio: "3/2" },
];

export default function ProjectGallery() {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  // For SSR compatibility
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper function to handle image paths in Next.js
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
                text={"GALLERY"}
              />
            </div>
          </Col>
          <Col lg={12}>
            {mounted && (
              <LightGallery
                elementClassNames="masonry-gallery"
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
                mode="lg-fade"
              >
                {galleryItems.map((item) => (
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
                    />
                  </a>
                ))}
              </LightGallery>
            )}
          </Col>
        </Row>
      </Container>
    </ProjectGalleryStyled>
  );
}

const ProjectGalleryStyled = styled.section`
  padding: 150px 0;

  .gallery-title {
    margin-bottom: 40px;
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
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.15);
      }
    }
  }
`;