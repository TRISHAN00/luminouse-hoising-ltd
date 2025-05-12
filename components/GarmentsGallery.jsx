"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

// Import the core lightgallery styles
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lightgallery.css";

// Import lightgallery and plugins
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";
import Title from "./Title";

// Sample garments gallery items - replace with your actual images
const garmentGalleryItems = [
  { 
    id: 1, 
    src: 'https://images.unsplash.com/photo-1687405182302-f1b28707c854?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Premium T-Shirt Collection"
  },
  { 
    id: 2, 
    src: 'https://images.unsplash.com/photo-1687226426209-0e5d2143c0d1?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Summer Dress Collection"
  },
  { 
    id: 3, 
    src: 'https://images.unsplash.com/photo-1608739872077-21ddc15dc152?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Denim Collection"
  },
  { 
    id: 4, 
    src: 'https://images.unsplash.com/photo-1702935287572-06f185a9dedc?q=80&w=1492&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Premium Cotton Fabric"
  },
  { 
    id: 5, 
    src: 'https://images.unsplash.com/photo-1575267168637-fa85c10f211f?q=80&w=1542&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Manufacturing Process"
  },
  { 
    id: 6, 
    src: 'https://images.unsplash.com/photo-1605538514871-7b8d1bd23718?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Formal Wear Collection"
  },
  { 
    id: 7, 
    src: 'https://images.unsplash.com/photo-1676477655436-a686054457de?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Sustainable Fashion Line"
  },
  { 
    id: 8, 
    src: 'https://images.unsplash.com/photo-1608434536950-d7d084398bf5?q=80&w=1928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Children's Collection"
  },
  { 
    id: 9, 
    src: 'https://images.unsplash.com/photo-1711527088900-f7ebabda4e3f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Fashion Accessories"
  },
  { 
    id: 10, 
    src: 'https://plus.unsplash.com/premium_photo-1673356302439-fa5252f45abb?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Textile Patterns"
  },
  { 
    id: 11, 
    src: 'https://images.unsplash.com/photo-1613456478740-b4ac434ef548?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Design Process"
  },
  { 
    id: 12, 
    src: 'https://images.unsplash.com/photo-1711453148467-403c50d5ea7d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
    alt: "Seasonal Collection"
  },
];

export default function GarmentsGallery({title}) {
  // For SSR compatibility
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <GarmentsGalleryStyled>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="gallery-title">
              <Title
                center
                color={"#333333"}
                fontSize={"60"}
                text={title}
              />
              <p className="subtitle">Explore our premium garment collections</p>
            </div>
          </Col>
          
          <Col lg={12}>
            {mounted && (
              <LightGallery
                elementClassNames="garments-gallery"
                onInit={onInit}
                speed={500}
                plugins={[lgZoom]}
                mode="lg-fade"
              >
                {garmentGalleryItems.map((item) => (
                  <a 
                    href={item.src} 
                    key={item.id}
                    className="gallery-item"
                  >
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="img-responsive"
                    />
                    <div className="item-overlay">
                      <div className="item-info">
                        <h4>{item.alt}</h4>
                      </div>
                    </div>
                  </a>
                ))}
              </LightGallery>
            )}
          </Col>
        </Row>
      </Container>
    </GarmentsGalleryStyled>
  );
}

const GarmentsGalleryStyled = styled.section`
  padding: 120px 0;
  background-color: #f9f9f9;
  overflow: hidden;

  .gallery-title {
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 80px;
    
    .subtitle {
      color: #666;
      font-size: 18px;
      margin-top: 15px;
    }
  }

  .garments-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 20px;
    
    .gallery-item {
      display: block;
      overflow: hidden;
      border-radius: 8px;
      height: 280px;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.5s ease;
      }
      
      .item-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
        color: white;
        padding: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;
        
        .item-info {
          h4 {
            margin-bottom: 0;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 25px rgba(0,0,0,0.12);
        
        img {
          transform: scale(1.05);
        }
        
        .item-overlay {
          opacity: 1;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    padding: 60px 0;
    
    .gallery-title {
      h2 {
        font-size: 40px;
      }
    }
  }
`;