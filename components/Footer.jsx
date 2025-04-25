"use client";

import { ArrowUp, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import logo from "../public/images/static/logos/main-logo.svg";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          <FooterHeading>Address</FooterHeading>
          <FooterText>
            3rd Floor, House 412, Road 7, DOHS
            <br />
            Baridhara, Dhaka, Bangladesh
          </FooterText>
          <FooterText>luminoushousingltd@gmail.com</FooterText>
          <FooterText>
            01700 744340
            <br />
            01700 744340
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Navigate</FooterHeading>
          <FooterNav>
            <FooterNavItem>
              <Link href="/">Home</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link href="/about-us">About Us</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link href="/projects">Projects</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link href="/landowner">Landowner</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link href="/buyer">Buyer</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link href="/contact-us">Contact Us</Link>
            </FooterNavItem>
          </FooterNav>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Projects</FooterHeading>
          <FooterNav>
            <FooterNavItem>
              <Link href="/projects/ongoing">Ongoing</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link href="/projects/upcoming">Upcoming</Link>
            </FooterNavItem>
            <FooterNavItem>
              <Link href="/projects/completed">Completed</Link>
            </FooterNavItem>
          </FooterNav>
        </FooterSection>

        <FooterSection>
          <SocialLinks>
            <SocialLink href="https://facebook.com" aria-label="Facebook">
              <Facebook size={20} />
            </SocialLink>
            <SocialLink href="https://twitter.com" aria-label="Twitter">
              <Twitter size={20} />
            </SocialLink>
            <SocialLink href="https://linkedin.com" aria-label="LinkedIn">
              <Linkedin size={20} />
            </SocialLink>
            <SocialLink href="https://youtube.com" aria-label="YouTube">
              <Youtube size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <Divider />

      <FooterBottom>
        <LogoContainer>
          <Logo src={logo} alt="Luminous Housing Ltd" width={60} height={40} />
        </LogoContainer>

        <CopyrightInfo>
          <CopyrightText>© Luminous Housing Ltd</CopyrightText>
          <PrivacyLink href="/privacy-policy">Privacy Policy</PrivacyLink>
        </CopyrightInfo>

        <CreditsContainer>
          <CreditsText>Design by Finnkits</CreditsText>
        </CreditsContainer>
      </FooterBottom>

      <ScrollTopButton onClick={scrollToTop} aria-label="Scroll to top">
        <ArrowUp size={20} />
      </ScrollTopButton>

      <MessengerButton
        href="https://m.me/luminoushousing"
        aria-label="Chat on Messenger"
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
        >
          <path
            d="M18 0C8.059 0 0 7.254 0 16.873C0 21.429 1.985 25.476 5.2 28.399V36L12.571 32.863C14.287 33.379 16.11 33.746 18 33.746C27.941 33.746 36 26.492 36 16.873C36 7.254 27.941 0 18 0Z"
            fill="#0084FF"
          />
          <path
            d="M19.991 22.7L14.822 17.158L5 22.7L15.755 11.2L21.168 16.743L30.747 11.2L19.991 22.7Z"
            fill="white"
          />
        </svg>
      </MessengerButton>
    </FooterWrapper>
  );
};

// Styled Components
const FooterWrapper = styled.footer`
  background-color: #121212;
  color: #ffffff;
  padding: 60px 0 30px;
  position: relative;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 0 20px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterSection = styled.div`
  margin-bottom: 20px;
`;

const FooterHeading = styled.h3`
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 20px;
  color: #ffffff;
`;

const FooterText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 15px;
`;

const FooterNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterNavItem = styled.li`
  margin-bottom: 12px;

  a {
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 15px;

    &:hover {
      color: #fff;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0095ff;
    border-color: #0095ff;

    svg {
      color: #fff;
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 30px auto;
  max-width: 1160px;
  width: calc(100% - 40px);
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
`;

const LogoContainer = styled.div`
  max-width: 80px;
`;

const Logo = styled(Image)`
  height: auto;
  width: 100%;
`;

const CopyrightInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const CopyrightText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
`;

const PrivacyLink = styled.a`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #0095ff;
  }
`;

const CreditsContainer = styled.div``;

const CreditsText = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
`;

const ScrollTopButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 90px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0095ff;
  }
`;

const MessengerButton = styled.a`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 999;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export default Footer;
