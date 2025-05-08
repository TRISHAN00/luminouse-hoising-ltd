"use client";

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
            <TransactionBadge bg="primary">{transactionType}</TransactionBadge>
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
            <Card.Title className="mb-1">{clientName}</Card.Title>
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

export default function RealEstateTestimonials() {
  const testimonials = [
    {
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailSrc:
        "https://img.freepik.com/free-photo/medium-shot-man-working-as-real-estate-agent_23-2151064903.jpg?t=st=1746565005~exp=1746568605~hmac=60aa46c6ed588f0f53ccea67001f1f503e3f45a1a4b37111b9924982dbb03604&w=1060",
      clientName: "James & Sarah Wilson",
      propertyType: "Single Family Home",
      location: "Parkview Heights, CA",
      testimonialExcerpt:
        "Our agent went above and beyond to help us find our dream home. The entire process was smooth from start to finish, and we couldn't be happier with our new property.",
      rating: 5,
      propertyImage:
        "https://img.freepik.com/free-photo/3d-rendering-house-model_23-2150799725.jpg?t=st=1746563645~exp=1746567245~hmac=7c1f9babd12c1c6a948e9bcf16fbc4fb6f33ee42ce63ec061f8616700e87b7d3&w=740",
      transactionType: "Buyer",
    },
    {
      youtubeUrl: "https://youtu.be/jNQXAC9IVRw",
      thumbnailSrc:
        "https://img.freepik.com/free-photo/positive-male-florist-standing-rows-with-potted-plants-greenhouse-cutting-bush-holding-sprouts_74855-12949.jpg?t=st=1746565027~exp=1746568627~hmac=c557df4e6dfa5fa3c15315f8c6c9b1df167931d27c1944a91e7ff2f493460e46&w=996",
      clientName: "Michael Chen",
      propertyType: "Luxury Condo",
      location: "Downtown District",
      testimonialExcerpt:
        "I was able to sell my property for 15% above asking price thanks to the expert staging and marketing strategy. The virtual tours brought in serious buyers immediately.",
      rating: 5,
      propertyImage:
        "https://img.freepik.com/free-photo/urban-traffic-with-cityscape_1359-324.jpg?t=st=1746563700~exp=1746567300~hmac=eb2995b4a3af607ead488f8e7e73efa628cbef02872f44acfb26b78b0faa6228&w=996",
      transactionType: "Seller",
    },
    {
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnailSrc:
        "https://img.freepik.com/free-photo/portrait-mature-man-wearing-jacket-cap-posing-outdoor-meadow-with-chainsaw-hands_176532-14597.jpg?t=st=1746565052~exp=1746568652~hmac=3e4ac718e35d2fcd2495c89d61dde05b6334c674dcf2f5ecc99ac534bdfb1500&w=996",
      clientName: "Emma & David Thompson",
      propertyType: "Townhouse",
      location: "Riverside Community",
      testimonialExcerpt:
        "After months of searching with another agency, we switched and found our perfect home within weeks. The team understood exactly what we were looking for and negotiated a great price.",
      rating: 4,
      propertyImage:
        "https://img.freepik.com/free-photo/3d-house-model-with-modern-architecture_23-2151004030.jpg?t=st=1746563791~exp=1746567391~hmac=8aa241c15d33729d57f2ce97d3b79bdfc332ed0c56ea68dff1aac0657dcd04d4&w=1380",
      transactionType: "Buyer",
    },
    {
      youtubeUrl: "https://youtu.be/jNQXAC9IVRw",
      thumbnailSrc:
        "https://img.freepik.com/free-photo/futuristic-technology-concept_23-2151908083.jpg?t=st=1746565070~exp=1746568670~hmac=0343259638dd13f420f6ba284d661eaa2f476456d94e0fa78e4255c2633c45df&w=1060",
      clientName: "Robert Garcia",
      propertyType: "Investment Property",
      location: "Seaview Heights",
      testimonialExcerpt:
        "Their property management team has been handling my rental properties for years. Vacancies are minimal, and they take care of everything so I can be a hands-off investor.",
      rating: 5,
      propertyImage:
        "https://img.freepik.com/free-photo/view-city-with-buildings-trees_1127-352.jpg?t=st=1746563814~exp=1746567414~hmac=43dc0cf8ffc71b76aa07417753ff22d9d5dbbe15ec6e0786208f254dc5af2490&w=996",
      transactionType: "Investor",
    },
  ];

  return (
    <SectionContainer>
      <Container>
        <SectionHeader>
          <div className="video-test-title">
            <Title
              textAlign={"left"}
              color={"#5B5B5B"}
              fontSize={"60"}
              text={"Hear From Our Happy Clients"}
            />
          </div>
          <SectionDescription>
            Real stories from real clients about their experience working with
            our team of dedicated real estate professionals.
          </SectionDescription>
        </SectionHeader>

        <Row className="g-4">
          {testimonials.map((testimonial, index) => (
            <Col md={6} key={index}>
              <PropertyTestimonial {...testimonial} />
            </Col>
          ))}
        </Row>
      </Container>
    </SectionContainer>
  );
}