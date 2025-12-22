"use client";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-20px);
  }
`;

const Wrapper = styled.div`
  position: relative;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 2px;
  text-align: center;
`;

const Slide = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 14px;
  font-weight: 400;
  width: fit-content;
  padding: 0px 5px;
  color: #fff;
  letter-spacing: 0.1rem;
  background: #2284C4;
  border-radius: 4px;
  white-space: nowrap;
  
  opacity: ${props => props.isActive ? 1 : 0};
  animation: ${props => props.isActive ? fadeIn : fadeOut} 0.6s ease-in-out;
  
  /* Tablet desktop :768px. */
  @media (min-width: 768px) and (max-width: 991px) {
    /* you can add specific tablet styles here */
  }

  /* Small mobile :320px. */
  @media (max-width: 767px) {
    font-size: 10px;
  }
`;

export default function AutoScrollText() {
  const texts = ["RAJUK ENLISTED", "REHAB MEMBER"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % texts.length);
    }, 3000); // every 3s
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <Wrapper>
      {texts.map((text, i) => (
        <Slide key={i} isActive={i === current}>
          {text}
        </Slide>
      ))}
    </Wrapper>
  );
}