"use client";
import Title from "@/components/Title";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import newImage from "../../../public/images/dynamic/home/banner-01.jpg";

export default function NewsDetails() {
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
              <span className="date">| 05 Feb, 2025</span>
            </div>

            <Title
              color={"#5B5B5B"}
              fontSize={"60"}
              text={"Exciting Marathon Event Happening This Spring"}
            />

            <div className="featured-image">
              <Image
                src={newImage}
                alt="Marathon Event"
                width={1200}
                height={500}
                style={{ objectFit: "cover", borderRadius: "20px" }}
              />
            </div>

            <div className="content">
              <p>
                The city is preparing for an exciting marathon event this
                spring, expected to draw thousands of participants from all
                walks of life. Whether you're a professional runner or a casual
                jogger, this event promises to be both fun and competitive.
              </p>
              <p>
                Registrations are now open, and early birds get a free t-shirt
                and a welcome pack! Don't miss out on this incredible
                opportunity to be part of a high-energy, community-driven
                experience.
              </p>
              <ul>
                <li>Event Date: March 30, 2025</li>
                <li>Distance Options: 4km, 10km, Half Marathon</li>
                <li>Location: Central City Park</li>
              </ul>
            </div>
          </Col>
          <Col lg={4}>
            <SocialShareStyled>
              <h3>Share This Post</h3>
              <div className="share-icons">
                <a href="#" className="share-icon facebook">
                  <Facebook />
                </a>
                <a href="#" className="share-icon twitter">
                  <Twitter />
                </a>
                <a href="#" className="share-icon linkedin">
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
    margin: 30px 0;
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
