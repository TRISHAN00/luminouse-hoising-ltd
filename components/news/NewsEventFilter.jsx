"use client";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import NewsCard from "./NewsCard";

const NewsFilter = ({ newsList }) => {
  console.log(newsList)
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filterCategories = [
    { id: "all", label: "All" },
    { id: 1, label: "News" },
    { id: 2, label: "Events" },
    { id: 3, label: "Blog" },
  ];

  // Function to get the date from item for sorting
  const getItemDate = (item) => {
    return new Date(
      item?.data?.date ||
        item?.date ||
        item?.created_at ||
        item?.published_at ||
        0
    );
  };

  // Filter and sort the news items
  const getFilteredAndSortedItems = () => {
    let filteredItems = [...(newsList?.data || [])];

    // Apply category filter
    if (activeFilter !== "all") {
      filteredItems = filteredItems.filter((item) => {
        const itemCategoryId = item?.category_id || item?.data?.category_id;
        return itemCategoryId === activeFilter;
      });
    }

    // Sort by date (latest first)
    filteredItems.sort((a, b) => {
      const dateA = getItemDate(a);
      const dateB = getItemDate(b);
      return dateB - dateA; // Latest first
    });

    return filteredItems;
  };

  const filteredAndSortedItems = getFilteredAndSortedItems();

  return (
    <NewsFilterStyled>
      <Container>
        <Row>
          <Col lg={10}>
            <div className="filter-buttons">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-btn ${
                    activeFilter === category.id ? "active" : ""
                  }`}
                  onClick={() => handleFilterClick(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </Col>
        </Row>

        <Row className="news-grid">
          {filteredAndSortedItems.map((item, index) => {
            return (
              <Col
                lg={4}
                md={6}
                key={item.id || index}
                className="news-item-col"
              >
                <NewsCard item={item} />
              </Col>
            );
          })}
        </Row>

        {filteredAndSortedItems.length === 0 && (
          <Row>
            <Col>
              <div className="no-items-message">
                <p>No items found for the selected category.</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </NewsFilterStyled>
  );
};

const NewsFilterStyled = styled.div`
  padding: 120px 0;
  .filter-buttons {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 0.75rem 1.5rem;
    border: 2px solid #e0e0e0;
    background-color: white;
    color: #666;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: 500;
    font-size: 0.9rem;

    &:hover {
      border-color: #333;
      color: #333;
    }

    &.active {
      background-color: #333;
      color: white;
      border-color: #333;
    }
  }

  .news-grid {
    margin-top: 2rem;
  }

  .news-item-col {
    margin-bottom: 2rem;
  }

  .no-items-message {
    text-align: center;
    padding: 3rem 0;
    color: #666;

    p {
      font-size: 1.1rem;
      margin: 0;
    }
  }

  @media (max-width: 768px) {
    .filter-buttons {
      justify-content: center;
    }

    .filter-btn {
      flex: 1;
      min-width: 120px;
      text-align: center;
    }
  }
`;

export default NewsFilter;
