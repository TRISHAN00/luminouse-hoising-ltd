"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Simulate minimum display time for the preloader
    const minDisplayTime = setTimeout(() => {
      // Start fade out animation
      setLoading(false);
    }, 2000);

    // Add window load event for actual content loading
    const handleLoad = () => {
      clearTimeout(minDisplayTime);
      setLoading(false);
    };

    // Check if window is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(minDisplayTime);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Only render in browser, not during SSR
  if (!mounted) return null;

  return createPortal(
    <PreloaderWrapper $loading={loading}>
      <LoaderContent>
        <LogoWrapper>
          {/* Replace with your own logo */}
          <Logo>
            <span>LOGO</span>
          </Logo>
        </LogoWrapper>
        
        <LoadingBar>
          <ProgressBar />
        </LoadingBar>
        
        <LoadingText>
          Loading<Dots><span>.</span><span>.</span><span>.</span></Dots>
        </LoadingText>
      </LoaderContent>
    </PreloaderWrapper>,
    document.body
  );
}

// Animations
const fadeOut = keyframes`
  from { opacity: 1; visibility: visible; }
  to { opacity: 0; visibility: hidden; }
`;

const progress = keyframes`
  from { width: 0; }
  to { width: 100%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const dotAnimation = keyframes`
  0%, 20% { opacity: 0; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-5px); }
  80%, 100% { opacity: 0; transform: translateY(0); }
`;

// Styled Components
const PreloaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0288D1;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.8s ease, visibility 0.8s ease;
  animation: ${props => props.$loading ? 'none' : fadeOut} 0.8s ease forwards;
`;

const LoaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  max-width: 300px;
`;

const LogoWrapper = styled.div`
  margin-bottom: 30px;
  animation: ${pulse} 2s infinite ease-in-out;
`;

const Logo = styled.div`
  font-size: 48px;
  font-weight: 700;
  color: white;
  letter-spacing: 2px;
  
  span {
    display: inline-block;
  }
`;

const LoadingBar = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 15px;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 0;
  background: white;
  border-radius: 4px;
  animation: ${progress} 2s ease-in-out forwards;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  display: flex;
`;

const Dots = styled.div`
  display: inline-flex;
  
  span {
    opacity: 0;
    animation: ${dotAnimation} 1.5s infinite;
    margin-left: 2px;
    
    &:nth-child(1) {
      animation-delay: 0s;
    }
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;