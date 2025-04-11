"use client";

import { white } from "@/styles/globalStyleVars";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdClose, MdMenu, MdOutlineLocalPhone } from "react-icons/md";
import styled from "styled-components";
import logo from "../public/images/static/logos/white-logo.svg";

export default function Menu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const headerRef = useRef(null);
  const navItemsRef = useRef([]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state for style changes
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Hide/show header based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setHeaderVisible(false); // Scrolling down - hide header
      } else {
        setHeaderVisible(true); // Scrolling up - show header
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Animate nav items on mount
  useEffect(() => {
    gsap.fromTo(
      navItemsRef.current,
      { y: -20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power3.out",
        delay: 0.3
      }
    );
  }, []);

  // Toggle mobile menu with animation
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Menu items
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "News & Events", href: "/news" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <StyledHeader 
      ref={headerRef}
      isScrolled={isScrolled} 
      isVisible={headerVisible}
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={3} xs={8}>
            <Link href="/" passHref>
              <LogoWrapper>
                <Image src={logo} alt="Main Logo" width={80} priority />
              </LogoWrapper>
            </Link>
          </Col>
          <Col lg={9} xs={4}>
            <HeaderRight>
              {/* Desktop Menu */}
              <NavMenu>
                <ul>
                  {menuItems.map((item, index) => (
                    <li 
                      key={index}
                      ref={el => navItemsRef.current[index] = el}
                    >
                      <Link prefetch={true} href={item.href}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavMenu>
              
              <PhoneIcon>
                <Link href="tel:+88000000000">
                  <MdOutlineLocalPhone />
                </Link>
              </PhoneIcon>
              
              {/* Mobile Menu Toggle */}
              <MobileMenuToggle onClick={toggleMobileMenu}>
                {mobileMenuOpen ? <MdClose /> : <MdMenu />}
              </MobileMenuToggle>
            </HeaderRight>
          </Col>
        </Row>
      </Container>
      
      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay isOpen={mobileMenuOpen}>
        <MobileNavMenu>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link 
                  href={item.href} 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <MobilePhoneLink>
            <Link href="tel:+88000000000" onClick={() => setMobileMenuOpen(false)}>
              <MdOutlineLocalPhone /> Call Us
            </Link>
          </MobilePhoneLink>
        </MobileNavMenu>
      </MobileMenuOverlay>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${props => props.isScrolled ? '10px 0' : '20px 0'};
  z-index: 1000;
  transition: all 0.4s ease, transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  transform: translateY(${props => props.isVisible ? '0' : '-100%'});
  background: ${props => props.isScrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${props => props.isScrolled ? '2px' : '0'};
    background: linear-gradient(to right, transparent, #0288D1, transparent);
    opacity: 0.7;
  }

  @media (max-width: 991px) {
    padding: ${props => props.isScrolled ? '8px 0' : '15px 0'};
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  img {
    max-width: 100%;
    height: auto;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 991px) {
    gap: 20px;
  }
`;

const NavMenu = styled.nav`
  ul {
    display: flex;
    gap: 30px;
    margin: 0;
    padding: 0;
    list-style: none;
    
    li {
      position: relative;
      overflow: hidden;
      
      a {
        color: ${white};
        font-weight: 500;
        font-size: 16px;
        position: relative;
        transition: color 0.3s ease;
        padding: 5px 0;
        
        &:hover {
          color: #fff !important;
        }
        
        &::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background: #0288D1;
          transition: width 0.4s cubic-bezier(0.65, 0, 0.35, 1);
        }
        
        &:hover::after {
          width: 100%;
        }
      }
    }
  }
  
  @media (max-width: 991px) {
    display: none;
  }
`;

const PhoneIcon = styled.div`
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0288D1;
    color: #fff;
    font-size: 22px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
    &:hover {
      background-color: #fff;
      color: #0288D1;
      transform: scale(1.1);
      box-shadow: 0 5px 15px rgba(2, 136, 209, 0.4);
    }
  }
  
  @media (max-width: 991px) {
    display: none;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${white};
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
  
  @media (max-width: 991px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.4s ease, visibility 0.4s ease;
  opacity: ${props => props.isOpen ? '1' : '0'};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  overflow-y: auto;
`;

const MobileNavMenu = styled.nav`
  text-align: center;
  padding: 20px;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 30px;
    
    li {
      margin: 20px 0;
      transform: translateY(20px);
      opacity: 0;
      animation: slideIn 0.5s forwards;
      
      @keyframes slideIn {
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      &:nth-child(1) { animation-delay: 0.1s; }
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.3s; }
      &:nth-child(4) { animation-delay: 0.4s; }
      &:nth-child(5) { animation-delay: 0.5s; }
      &:nth-child(6) { animation-delay: 0.6s; }
      
      a {
        color: ${white};
        font-size: 24px;
        font-weight: 500;
        position: relative;
        padding: 5px 10px;
        transition: color 0.3s ease;
        
        &:after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background: #0288D1;
          transition: all 0.3s ease;
        }
        
        &:hover {
          color: #0288D1;
          
          &:after {
            width: 100%;
            left: 0;
          }
        }
      }
    }
  }
`;

const MobilePhoneLink = styled.div`
  margin-top: 40px;
  animation: fadeIn 0.5s forwards;
  animation-delay: 0.7s;
  opacity: 0;
  
  @keyframes fadeIn {
    to {
      opacity: 1;
    }
  }
  
  a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #0288D1;
    color: white;
    padding: 12px 25px;
    border-radius: 30px;
    font-size: 18px;
    font-weight: 500;
    transition: all 0.3s ease;
    
    &:hover {
      background: white;
      color: #0288D1;
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(2, 136, 209, 0.3);
    }
    
    svg {
      font-size: 22px;
    }
  }
`;