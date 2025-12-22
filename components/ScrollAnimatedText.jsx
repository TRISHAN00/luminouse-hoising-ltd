"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/**
 * ScrollAnimatedText - A reusable component that animates text when scrolled into view
 * @param {Object} props
 * @param {React.ReactNode} props.children - The text content to animate
 * @param {string} props.tag - HTML tag to use for the text element (default: 'div')
 * @param {string} props.animation - Animation type ('split-up', 'fade-in', 'slide-in')
 * @param {number} props.delay - Base delay before animation starts (in seconds)
 * @param {number} props.stagger - Delay between each word (in seconds)
 * @param {number} props.threshold - Viewport threshold to trigger animation (0-1)
 * @param {boolean} props.once - Whether to animate only once or every time in view
 * @param {Object} props.style - Additional style props to pass to the container
 * @param {string} props.className - Additional classes to add to the container
 */
const ScrollAnimatedText = ({
  children,
  tag = "div",
  animation = "split-up",
  delay = 0,
  stagger = 0.1,
  threshold = 0.2,
  once = true,
  style = {},
  className = "",
  ...props
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  // Split text into individual words or preserve HTML tags
  const processContent = () => {
    if (typeof children !== 'string') {
      return [{ content: children, isHtml: true }];
    }
    
    // Check if content has HTML
    if (children.includes("<")) {
      return processHtmlContent(children);
    } else {
      // Simple text split by words
      return children.split(" ").map((word, index) => ({
        content: word + " ",
        isHtml: false,
        delay: delay + (index * stagger)
      }));
    }
  };
  
  // Process HTML content to preserve tags
  const processHtmlContent = (htmlContent) => {
    const parts = [];
    let wordCount = 0;
    
    // Split by HTML tags but keep the tags
    const segments = htmlContent.split(/(<[^>]*>)/g).filter(Boolean);
    
    segments.forEach(segment => {
      if (segment.startsWith("<")) {
        // This is an HTML tag, keep it as is
        parts.push({
          content: segment,
          isHtml: true,
          delay: 0
        });
      } else {
        // This is text, split it into words
        const words = segment.split(" ").filter(Boolean);
        words.forEach(word => {
          parts.push({
            content: word + " ",
            isHtml: false,
            delay: delay + (wordCount * stagger)
          });
          wordCount++;
        });
      }
    });
    
    return parts;
  };

  useEffect(() => {
    // Skip if already animated with once=true
    if (once && hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -10% 0px' // Slightly before element comes into view
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, [threshold, once, hasAnimated]);

  const parts = processContent();
  const Container = styled[tag]`
    display: inline-block;
    overflow: visible;
  `;

  return (
    <Container
      ref={containerRef}
      className={`animated-text ${animation} ${className}`}
      style={style}
      {...props}
    >
      {parts.map((part, index) => (
        part.isHtml ? (
          <span key={index} dangerouslySetInnerHTML={{ __html: part.content }} />
        ) : (
          <AnimatedWord
            key={index}
            delay={part.delay}
            isVisible={isVisible}
            animation={animation}
          >
            {part.content}
          </AnimatedWord>
        )
      ))}
    </Container>
  );
};

// Styled component for individual words with animation
const AnimatedWord = styled.span`
  display: inline-block;
  will-change: transform, opacity;
  
  /* Split Up Animation */
  ${props => props.animation === 'split-up' && `
    transform: translateY(${props.isVisible ? '0' : '2em'});
    opacity: ${props.isVisible ? 1 : 0};
    transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1), 
                opacity 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
    transition-delay: ${props.delay}s;
  `}
  
  /* Fade In Animation */
  ${props => props.animation === 'fade-in' && `
    opacity: ${props.isVisible ? 1 : 0};
    transition: opacity 0.8s ease;
    transition-delay: ${props.delay}s;
  `}
  
  /* Slide In Animation */
  ${props => props.animation === 'slide-in' && `
    transform: translateX(${props.isVisible ? '0' : '-1em'});
    opacity: ${props.isVisible ? 1 : 0};
    transition: transform 0.8s cubic-bezier(0.165, 0.84, 0.44, 1),
                opacity 0.8s cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-delay: ${props.delay}s;
  `}
`;

export default ScrollAnimatedText;