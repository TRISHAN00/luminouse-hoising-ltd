"use client";
import { Img } from "@/components/Img";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import BreakCrumb from "../BreakCrumb";

const InnerBannerDetail = ({ img, text, title, data }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Split the title into words or by HTML tags if present
  const splitTitle = () => {
    if (!title) return [];
    
    // Check if title contains HTML
    if (title.includes("<")) {
      // If HTML tags exist, preserve them but split surrounding text
      return processHtmlTitle(title);
    } else {
      // Simple split for plain text titles
      return title.split(" ").map((word, index) => ({
        word,
        delay: index * 0.1
      }));
    }
  };

  // Process HTML title to maintain tags while splitting text
  const processHtmlTitle = (htmlTitle) => {
    // This is a simplified approach - for complex HTML, you might need a proper parser
    const parts = [];
    let wordCount = 0;
    
    // Split by HTML tags but keep the tags
    const segments = htmlTitle.split(/(<[^>]*>)/g).filter(Boolean);
    
    segments.forEach(segment => {
      if (segment.startsWith("<")) {
        // This is an HTML tag, keep it as is
        parts.push({
          word: segment,
          isHtml: true,
          delay: 0 // Tags don't get animation delay
        });
      } else {
        // This is text, split it into words
        const words = segment.split(" ").filter(Boolean);
        words.forEach(word => {
          parts.push({
            word: word + " ",
            isHtml: false,
            delay: wordCount * 0.1
          });
          wordCount++;
        });
      }
    });
    
    return parts;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const titleParts = splitTitle();

  return (
    <StyledInnerBanner className="InnerBanner">
      <Img banner={true} src={img?.full_path} />
      <Overlay />
      <Container>
        <h2 className="split-title">
          {titleParts.map((part, index) => (
            <SplitWord 
              key={index} 
              delay={part.delay} 
              isMounted={isMounted}
              dangerouslySetInnerHTML={
                part.isHtml ? { __html: part.word } : undefined
              }
            >
              {!part.isHtml && part.word}
            </SplitWord>
          ))}
        </h2>
        <BreakCrumb data={data} />
      </Container>
    </StyledInnerBanner>
  );
};

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const SplitWord = styled.span`
  display: inline-block;
  transform: translateY(${props => props.isMounted ? "0" : "50px"});
  opacity: ${props => props.isMounted ? 1 : 0};
  transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), 
              opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-delay: ${props => props.delay}s;

  span {
    font-weight: 600;
    color: #ffffff;
  }
`;

const StyledInnerBanner = styled.section`
  padding-top: calc(520 / 1366 * 100%);
  position: relative;
  background-color: #ddd;
  overflow: hidden;

  .container {
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    bottom: 150px;
    z-index: 2;
  }

  h2 {
    color: #ffffff;
    font-size: 60px;
    font-weight: 300;
    line-height: 70px;
    text-align: center;
    text-transform: uppercase;
    z-index: 2;
    overflow: hidden;
    flex-wrap: wrap;
  }

  @media (min-width: 767px) {
    .title {
      width: 50%;
    }
  }

  @media (max-width: 991px) {
    h2 {
      font-size: 50px;
      line-height: 60px;
    }
  }

  @media (max-width: 767px) {
    padding-top: calc(560 / 414 * 100%);
    
    .container {
      bottom: 69px;
    }

    .title {
      margin-bottom: 40px !important;
    }

    h2 {
      font-size: 40px;
      line-height: 45px;
    }
  }

  @media (max-width: 575px) {
    h2 {
      font-size: 32px;
      line-height: 40px;
    }
  }
`;

export default InnerBannerDetail;