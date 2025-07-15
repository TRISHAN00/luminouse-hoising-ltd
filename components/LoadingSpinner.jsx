"use client"
import Image from "next/image";
import styled from "styled-components";
import mainLogo from "../public/images/static/logos/main-logo.svg";

const LoadingSpinner = () => (
  <SpinnerContainer>
    <Image src={mainLogo} alt="Main Logo" width={200} priority />
  </SpinnerContainer>
);

// Loading Spinner Styled Components
const SpinnerContainer = styled.div`
  position: absolute;
  content: "";
  inset: 0;
  z-index: 999999999;
  background-color: #171717;
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 120px 20px;
  min-height: 400px;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #0288d1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerText = styled.p`
  color: #5b5b5b;
  font-size: 16px;
  margin: 0;
  text-align: center;
`;

export default LoadingSpinner;
