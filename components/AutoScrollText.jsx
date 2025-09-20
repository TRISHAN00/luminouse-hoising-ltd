"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  height: 30px; /* adjust based on font size */
  overflow: hidden;
  margin-top: 8px;
  text-align: center;
`;

const Inner = styled.div`
  transition: transform 0.7s ease-in-out;
  transform: translateY(${(props) => `-${props.current * 100}%`});
`;

const Slide = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  font-weight: 400;
  width: fit-content;
  padding: 0px 5px;
  color: #fff;
  letter-spacing: 0.1rem;
 
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
    }, 3000); // every 2.5s
    return () => clearInterval(timer);
  }, [texts.length]);

  return (
    <Wrapper>
      <Inner current={current}>
        {texts.map((text, i) => (
          <Slide key={i}>{text}</Slide>
        ))}
      </Inner>
    </Wrapper>
  );
}
