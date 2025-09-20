"use client";

import HTMLReactParser from "html-react-parser";
import { ArrowUp, Facebook, Instagram, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import livousDenimLogo from "../public/images/static/logos/Livous_denim.svg";
import luminouseArchLogo from "../public/images/static/logos/luminouse-arch.svg";
import mainLogo from "../public/images/static/logos/main-logo.svg";
import SocialIcons from "./SocialIcons";

const Footer = ({ isLivousDenim, isLuminouseArch, settingsData }) => {
  const location = settingsData?.data?.office_location;
  const email = settingsData?.data?.contact_email;
  const phone = settingsData?.data?.office_phone;
  const sPhone = settingsData?.data?.office_fax;
  const facebook = settingsData?.data?.facebook;
  const twitter = settingsData?.data?.twitter;
  const instagram = settingsData?.data?.instagram;
  const youtube = settingsData?.data?.youtube;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getLogo = isLivousDenim
    ? livousDenimLogo
    : isLuminouseArch
    ? luminouseArchLogo
    : mainLogo;

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterSection>
          {location && (
            <>
              <FooterHeading>Address</FooterHeading>
              <FooterText>{HTMLReactParser(location)}</FooterText>
            </>
          )}

          {email && <FooterText>{email}</FooterText>}
          {phone && <FooterText>{HTMLReactParser(phone)}</FooterText>}
          {sPhone && <FooterText>{HTMLReactParser(sPhone)}</FooterText>}
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
          </FooterNav>
        </FooterSection>

        <FooterSection>
          <FooterHeading>Projects</FooterHeading>
          <FooterNavItem>
            <Link href="/projects?status=ongoing">Ongoing</Link>
          </FooterNavItem>
          <FooterNavItem>
            <Link href="/projects?status=upcoming">Upcoming</Link>
          </FooterNavItem>
          <FooterNavItem>
            <Link href="/projects?status=completed">Completed</Link>
          </FooterNavItem>
        </FooterSection>

        <FooterSection>
          <SocialLinks>
            {facebook && (
              <SocialLink href={facebook} target="_blank" aria-label="Facebook">
                <Facebook size={20} />
              </SocialLink>
            )}

            {twitter && (
              <SocialLink href={twitter} target="_blank" aria-label="twitter">
                <X size={20} />
              </SocialLink>
            )}

            {instagram && (
              <SocialLink href={instagram} target="_blank" aria-label="twitter">
                <Instagram size={20} />
              </SocialLink>
            )}

            {youtube && (
              <SocialLink href={youtube} target="_blank" aria-label="youtube">
                <Instagram size={20} />
              </SocialLink>
            )}
          </SocialLinks>
        </FooterSection>
      </FooterContent>

      <Divider />

      <FooterBottom>
        <LogoContainer>
          <Logo src={getLogo} alt="Luminous Housing Ltd" width={100} />
        </LogoContainer>

        <CopyrightInfo>
          <CopyrightText>
            © {new Date().getFullYear()} Luminous Housing Ltd.
          </CopyrightText>
        </CopyrightInfo>

        <CreditsContainer>
          <CreditsText>
            Developed by
            <a
              style={{
                color: "#fff",
                fontWeight: "bold",
                letterSpacing: "1px",
              }}
              target="_blank"
              href="https://trishansaha.com/"
            >
              Trishan
            </a>
          </CreditsText>
        </CreditsContainer>
      </FooterBottom>

      <ScrollTopButton onClick={scrollToTop} aria-label="Scroll to top">
        <ArrowUp size={20} />
      </ScrollTopButton>

      <SocialIcons />
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

  a {
    margin-left: 5px;
  }
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

export default Footer;
