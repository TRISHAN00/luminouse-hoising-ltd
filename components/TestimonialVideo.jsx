"use client";

import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Title from "./Title";

// Styled Components
const ThumbnailContainer = styled.div`
  position: relative;
  height: 400px;
`;

const ThumbnailWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f8f9fa;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ThumbnailOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`;

const PlayButtonWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(13, 110, 253, 0.75);
  border-radius: 50%;
  color: white;
`;

const TransactionBadge = styled(Badge)`
  position: absolute;
  top: 0;
  right: 0;
  margin: 0.5rem;
`;

const PlaceholderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
`;

const PlaceholderIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #6c757d;
`;

const VideoIframe = styled.iframe`
  width: 100%;
  height: 400px;
  border: 0;
`;

const ErrorContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc3545;
  font-weight: bold;
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(248, 249, 250, 0.25);
  color: #0d6efd;
  font-weight: bold;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const ClientInfo = styled.div``;

const PropertyDetails = styled.div`
  display: flex;
  align-items: center;
  color: #6c757d;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
`;

const LocationSeparator = styled.span`
  margin: 0 0.5rem;
`;

const PropertyImageContainer = styled.div`
  width: 4rem;
  height: 4rem;
  overflow: hidden;
`;

const PropertyImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0.25rem;
`;

const TestimonialText = styled(Card.Text)`
  color: #6c757d;
  font-style: italic;
  flex-grow: 1;
`;

const StarsContainer = styled.div``;

const StarWrapper = styled.span`
  margin-top: 0.25rem;
`;

const SectionContainer = styled.section`
  padding-bottom: 10rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  .video-test-title {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
`;

const SectionBadge = styled(Badge)`
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 0.75rem;
`;

const SectionDescription = styled.p`
  color: #6c757d;
  max-width: 48rem;
  margin-left: auto;
  margin-right: auto;
`;

const ActionButton = styled(Button)`
  margin-top: 1rem;
`;

// Utility function to extract YouTube video ID from different URL formats
const getYoutubeVideoId = (url) => {
  if (!url) return null;

  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

// Simple SVG Icons
const PlayIcon = () => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const ImagePlaceholderIcon = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity="0.5"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const HomeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "4px" }}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const StarIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#FFD700" : "none"}
    stroke={filled ? "#FFD700" : "#D1D5DB"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="me-2"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const PropertyTestimonial = ({
  youtubeUrl,
  thumbnailSrc,
  clientName,
  propertyType,
  location,
  testimonialExcerpt,
  rating,
  propertyImage,
  transactionType,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = getYoutubeVideoId(youtubeUrl);

  // Default YouTube thumbnail if custom thumbnail not provided
  const defaultThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : null;

  // Use custom thumbnail if provided, otherwise use YouTube default
  const displayThumbnail = thumbnailSrc || defaultThumbnail;
  const hasValidThumbnail = !!displayThumbnail;

  // Load YouTube iframe API
  useEffect(() => {
    // Only load if we have a valid video ID
    if (!videoId) return;

    // Load YouTube API if not already loaded
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";

      window.onYouTubeIframeAPIReady = () => {
        setIsLoaded(true);
      };

      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
      setIsLoaded(true);
    }

    return () => {
      // Clean up
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoId]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <StarWrapper key={i}>
        <StarIcon filled={i < count} />
      </StarWrapper>
    ));
  };

  return (
    <Card className="h-100">
      <ThumbnailContainer>
        {!isPlaying && hasValidThumbnail ? (
          <ThumbnailWrapper onClick={handlePlayClick}>
            <ImageContainer>
              <ThumbnailImage
                src={displayThumbnail}
                alt={`${clientName} testimonial thumbnail`}
              />
            </ImageContainer>
            <ThumbnailOverlay />
            <PlayButtonWrapper>
              <PlayIcon />
            </PlayButtonWrapper>
          </ThumbnailWrapper>
        ) : !isPlaying && !hasValidThumbnail && videoId ? (
          <PlaceholderContainer onClick={handlePlayClick}>
            <PlaceholderIcon>
              <ImagePlaceholderIcon />
            </PlaceholderIcon>
            <PlayButtonWrapper>
              <PlayIcon />
            </PlayButtonWrapper>
            <TransactionBadge bg="primary">{transactionType}</TransactionBadge>
          </PlaceholderContainer>
        ) : videoId ? (
          <VideoIframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&showinfo=0&autoplay=${
              isPlaying ? 1 : 0
            }&modestbranding=1`}
            title={`${clientName} Testimonial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <ErrorContainer>
            <ErrorIcon />
            Invalid YouTube URL
          </ErrorContainer>
        )}
        {!isLoaded && videoId && isPlaying && (
          <LoadingOverlay>Loading...</LoadingOverlay>
        )}
      </ThumbnailContainer>

      <Card.Body className="d-flex flex-column">
        <CardContent>
          <ClientInfo>
            <Card.Title className="mb-1">{HTMLReactParser(clientName)}</Card.Title>
            <PropertyDetails>
              <HomeIcon />
              <span>{propertyType}</span>
              <LocationSeparator>•</LocationSeparator>
              <span>{location}</span>
            </PropertyDetails>
            <StarsContainer>{renderStars(rating)}</StarsContainer>
          </ClientInfo>
          {propertyImage && (
            <PropertyImageContainer>
              <PropertyImage src={propertyImage} alt="Property" />
            </PropertyImageContainer>
          )}
        </CardContent>

        <TestimonialText>"{testimonialExcerpt}"</TestimonialText>
      </Card.Body>
    </Card>
  );
};

export default function RealEstateTestimonials({ data }) {
  return (
    <SectionContainer>
      <Container>
        <SectionHeader>
          {data?.section_data?.subtitle && (
            <div className="video-test-title">
              <Title
                textAlign={"left"}
                color={"#5B5B5B"}
                fontSize={"60"}
                text={data?.section_data?.subtitle}
              />
            </div>
          )}
          {data?.section_data?.short_desc && (
            <SectionDescription>
              {data?.section_data?.short_desc}
            </SectionDescription>
          )}
        </SectionHeader>

        <Row className="g-4">
          {data?.posts?.list.map((testimonial, index) => {
            // Extract the image URL from the images array
            const propertyImage = testimonial?.images?.[0]?.full_path || null;

            return (
              <Col md={6} key={index}>
                <PropertyTestimonial
                  youtubeUrl={testimonial?.data?.short_desc}
                  thumbnailSrc={testimonial?.images?.[0]?.full_path}
                  clientName={testimonial?.data?.title}
                  propertyType={testimonial?.data?.subtitle}
                  location={testimonial?.data?.subtitle} // You might want to add a separate location field
                  testimonialExcerpt={testimonial?.data?.description}
                  rating={parseInt(testimonial?.data?.rating) || 5}
                  propertyImage={propertyImage}
                  transactionType="Sale" 
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </SectionContainer>
  );
}
