"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function ClientCard({ title, imagePath, description, url }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardStyled
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $isHovered={isHovered}
    >
      <Link href={`${url}`}>
        <ImageContainer>
          <StyledImage
            src={imagePath}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            $isHovered={isHovered}
          />
          <Overlay $isHovered={isHovered} />

          <ContentWrapper>
            <TitleRow>
              <CardTitle>{title}</CardTitle>
              <CircleArrow>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  width="20"
                  height="20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </CircleArrow>
            </TitleRow>

            <DescriptionContainer $isHovered={isHovered}>
              <Description>{description}</Description>
            </DescriptionContainer>
          </ContentWrapper>
        </ImageContainer>
      </Link>
    </CardStyled>
  );
}

const CardStyled = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-4px);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 5/6;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  transition: transform 0.7s ease;
  transform: scale(${(props) => (props.$isHovered ? 1.05 : 1)});
`;

const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: ${(props) => (props.$isHovered ? "100%" : "0%")};
  transition: height 0.3s ease-in-out;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.3),
    transparent
  );
  z-index: 10;
`;

const ContentWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 400;
  color: white;
  margin: 0;

  @media (min-width: 767px) {
    margin-bottom: 2rem;
  }
`;

const CircleArrow = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.8;
`;

const DescriptionContainer = styled.div`
  transition: transform 0.5s ease, opacity 0.5s ease;
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
  transform: translateY(${(props) => (props.$isHovered ? "0" : "100px")});
`;

const Description = styled.p`
  color: white;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

const StyledLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: white;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-left: 0.5rem;
  }
`;
