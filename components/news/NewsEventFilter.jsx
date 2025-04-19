"use client";

import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import newImage from '../../public/images/dynamic/about/team-01.jpg';
import NewsCard from "./NewsCard";


// Sample news data - replace with your actual data
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

const NewsFilter = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filterCategories = [
    { id: "all", label: "All" },
    { id: "news", label: "News" },
    { id: "events", label: "Events" },
    { id: "blogs", label: "Blogs" }
  ];

  const filteredNews = activeFilter === "all" 
    ? newsItems 
    : newsItems.filter(item => item.category === activeFilter);

  return (
    <NewsFilterStyled>
      <Container>
        <Row>
          <Col lg={10}>
            <div className="filter-buttons">
              {filterCategories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                  onClick={() => handleFilterClick(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </Col>
        </Row>
        
        <Row className="news-grid">
          {filteredNews.map(item => (
            <Col lg={4} md={6} key={item.id} className="news-item-col">
              <NewsCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
    </NewsFilterStyled>
  );
};

const NewsFilterStyled = styled.section`
  padding: 80px 0;
  background-color: #f8f9fa;

  .filter-buttons {
    display: flex;
    margin-bottom: 50px;
    flex-wrap: wrap;
    gap: 10px;
  }

  .filter-btn {
    background-color: #f1f1f1;
    border: none;
    border-radius: 50px;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);

    &:hover {
      background-color: #e6e6e6;
    }

    &.active {
      background-color: #0275d8;
      color: white;
    }
  }

  .news-grid {
    margin-top: 20px;
  }

  .news-item-col {
    margin-bottom: 30px;
  }

  .news-item {
    background-color: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 3px 10px rgba(0,0,0,0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    }
  }

  .news-image {
    width: 100%;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  .news-content {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 15px;
      line-height: 1.3;
    }

    .news-excerpt {
      color: #666;
      margin-bottom: 15px;
      flex-grow: 1;
    }

    .news-date {
      color: #999;
      font-size: 14px;
      margin-top: auto;
    }
  }

  @media (max-width: 767px) {
    padding: 50px 0;

    .filter-buttons {
      margin-bottom: 30px;
    }

    .filter-btn {
      padding: 10px 20px;
      font-size: 14px;
    }

    .news-image {
      height: 180px;
    }

    .news-content h3 {
      font-size: 18px;
    }
  }
`;

export default NewsFilter;