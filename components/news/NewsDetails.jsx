"use client";
import Title from "@/components/Title";
import HTMLReactParser from "html-react-parser";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

export default function NewsBlogDetails({ projectData }) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const title = projectData?.data?.data?.title;
  const description = projectData?.data?.data?.body;
  const date = projectData?.data?.data?.date;
  const images = projectData?.data?.images?.list;

  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate().toString().padStart(2, "0"); // ensures 2 digits
    const month = dateObj.toLocaleString("en-US", { month: "short" }); // e.g., Feb
    const year = dateObj.getFullYear();
    return `${day} ${month}, ${year}`;
  }

  return (
    <NewsDetailsStyled>
      <Container>
        <Row>
          <Col lg={8}>
            <Link className="go-back-btn" href="/news">
              ← Back
            </Link>

            <div className="breadcrumb">
              <span className="category">News</span>{" "}
              <span className="date">| {formatDate(date)}</span>
            </div>

            <Title color={"#5B5B5B"} fontSize={"60"} text={title} />

            <div className="featured-image">
              {images?.map((image, index) => (
                <div className="image-wrap">
                  <Image
                    src={image?.full_path}
                    alt={index}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            <div className="content">{HTMLReactParser(description)}</div>
          </Col>
          <Col lg={4}>
            <SocialShareStyled>
              <h3>Share This Post</h3>
              <div className="share-icons">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    currentUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-icon facebook"
                >
                  <Facebook />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    currentUrl
                  )}&text=${encodeURIComponent(title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-icon twitter"
                >
                  <Twitter />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    currentUrl
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="share-icon linkedin"
                >
                  <Linkedin />
                </a>
              </div>
            </SocialShareStyled>
          </Col>
        </Row>
      </Container>
    </NewsDetailsStyled>
  );
}

const NewsDetailsStyled = styled.div`
  margin-top: 160px;
  margin-bottom: 80px;

  .go-back-btn {
    padding: 10px 25px;
    margin-bottom: 30px;
    background-color: transparent;
    border: 1px solid #999;
    border-radius: 50px;
    color: #333;
    text-decoration: none;
    font-size: 16px;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
      background-color: #333;
      color: #fff !important;
    }
  }

  .breadcrumb {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;

    .category {
      font-weight: bold;
    }
    .date {
      margin-left: 10px;
    }
  }

  .title {
    font-size: 36px;
    font-weight: bold;
    color: #222;
    margin: 20px 0;
  }

  .featured-image {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 30px 0;

    .image-wrap {
      flex: 1 1 48%;
      aspect-ratio: 3 / 2;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
    }

    @media (max-width: 768px) {
      .image-wrap {
        flex-basis: 100%;
      }
    }
  }

  .content {
    font-size: 18px;
    line-height: 1.8;
    color: #444;

    ul {
      padding-left: 20px;
      margin-top: 20px;

      li {
        margin-bottom: 10px;
        list-style: disc;
      }
    }
  }
`;

const SocialShareStyled = styled.div`
  padding: 30px;
  background-color: #f8f9fa;
  border-radius: 15px;
  margin-top: 100px;
  position: sticky;
  top: 120px;

  h3 {
    font-size: 22px;
    color: #333;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .share-icons {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .share-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 18px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        color: #fff !important;
      }

      &.facebook {
        background-color: #3b5998;
      }
      &.twitter {
        background-color: #1da1f2;
      }
      &.linkedin {
        background-color: #0077b5;
      }
      &.pinterest {
        background-color: #bd081c;
      }
    }
  }

  .share-count {
    text-align: center;
    font-size: 16px;
    color: #777;
    padding-top: 10px;
    border-top: 1px solid #e0e0e0;
  }
`;
