"use client";

import { white } from "@/styles/globalStyleVars";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdClose, MdExpandLess, MdExpandMore, MdMenu, MdOutlineLocalPhone } from "react-icons/md";
import styled from "styled-components";
import logo from "../public/images/static/logos/main-logo.svg";

export default function Menu({isNewsDetail}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const headerRef = useRef(null);
  const router = usePathname();

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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Toggle mobile dropdown
  const toggleMobileDropdown = (index) => {
    if (mobileActiveDropdown === index) {
      setMobileActiveDropdown(null);
    } else {
      setMobileActiveDropdown(index);
    }
  };

  // Check if menu item is active
  const isActive = (path) => {
    return router === path;
  };

  // Updated menu items with submenu
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    { label: "Projects", href: "/projects" },
    { 
      label: "Our Concern", 
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Livous Denim Ltd", href: "/livous-denim" },
        { label: "Luminous Design & Architecture Associates Ltd", href: "/luminous-design" }
      ] 
    },
    { 
      label: "Our Clients", 
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Landowner", href: "/landowner" },
        { label: "Buyer", href: "/buyer" }
      ] 
    },
    { label: "News & Events", href: "/news" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <StyledHeader 
      ref={headerRef}
      isScrolled={isScrolled} 
      isVisible={headerVisible}
      isNewsDetail={isNewsDetail}
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
                    <li key={index} className={item.hasDropdown ? "has-dropdown" : ""}>
                      {item.hasDropdown ? (
                        <>
                          <MenuLink as="div" className="dropdown-toggle">
                            {item.label} <MdExpandMore />
                          </MenuLink>
                          <HoverDropdownMenu>
                            {item.dropdownItems.map((dropItem, dropIndex) => (
                              <li key={dropIndex}>
                                <Link 
                                  href={dropItem.href}
                                  className={isActive(dropItem.href) ? "active" : ""}
                                >
                                  {dropItem.label}
                                </Link>
                              </li>
                            ))}
                          </HoverDropdownMenu>
                        </>
                      ) : (
                        <MenuLink 
                          prefetch={true} 
                          href={item.href}
                          className={isActive(item.href) ? "active" : ""}
                        >
                          {item.label}
                        </MenuLink>
                      )}
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
                {item.hasDropdown ? (
                  <>
                    <MobileDropdownToggle 
                      onClick={() => toggleMobileDropdown(index)}
                      isActive={mobileActiveDropdown === index}
                    >
                      {item.label}
                      {mobileActiveDropdown === index ? <MdExpandLess /> : <MdExpandMore />}
                    </MobileDropdownToggle>
                    <MobileDropdownMenu isOpen={mobileActiveDropdown === index}>
                      {item.dropdownItems.map((dropItem, dropIndex) => (
                        <li key={dropIndex}>
                          <Link 
                            href={dropItem.href}
                            className={isActive(dropItem.href) ? "active" : ""}
                            onClick={() => {
                              setMobileActiveDropdown(null);
                              setMobileMenuOpen(false);
                            }}
                          >
                            {dropItem.label}
                          </Link>
                        </li>
                      ))}
                    </MobileDropdownMenu>
                  </>
                ) : (
                  <Link 
                    href={item.href} 
                    onClick={() => setMobileMenuOpen(false)}
                    className={isActive(item.href) ? "active" : ""}
                  >
                    {item.label}
                  </Link>
                )}
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
  background: ${props => props.isScrolled || props.isNewsDetail ? 'rgba(0, 0, 0, 0.85)' : 'transparent'};
  backdrop-filter: ${props => props.isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.1)' : 'none'};
  
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${props => props.isScrolled ? '5px' : '0'};
    background: linear-gradient(to right, transparent, #fff, transparent);
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
    align-items: center;
    
    li {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      
      &.has-dropdown {
        &:hover .dropdown-toggle::after {
          width: 100%;
        }
        
        &:hover > ul {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
      }
    }
  }
  
  @media (max-width: 991px) {
    display: none;
  }
`;

const MenuLink = styled(Link)`
  color: ${white};
  font-weight: 500;
  font-size: 16px;
  position: relative;
  transition: color 0.3s ease;
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  
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
    background: #fff;
    transition: width 0.4s cubic-bezier(0.65, 0, 0.35, 1);
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
  
  &.active {
    &::after {
      background: #fff;
      height: 3px;
      bottom: 0;
    }
  }
  
  svg {
    font-size: 20px;
    margin-left: 2px;
  }
`;

const HoverDropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  min-width: 220px;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px !important;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
  z-index: 5;
  
  &:before {
    content: '';
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 12px;
    height: 12px;
    background: rgba(0, 0, 0, 0.9);
    z-index: -1;
  }
  
  li {
    display: block;
    margin: 0 !important;
    padding: 0 !important;
    height: auto !important;
    
    a {
      display: block;
      padding: 10px 15px !important;
      border-radius: 5px;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: ${white};
      font-weight: 500;
      font-size: 16px;
      transition: background-color 0.3s ease, color 0.3s ease;
      
      &::after {
        display: none;
      }
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
      
      &.active {
        background: rgba(255, 255, 255, 0.15);
      }
    }
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
  width: 100%;
  max-width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 30px;
    
    li {
      margin: 15px 0;
      
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
          background: #fff;
          transition: all 0.3s ease;
        }
        
        &:hover, &.active {
          color: #fff;
        }
        
        &:hover:after {
          width: 100%;
          left: 0;
        }
        
        &.active:after {
          width: 100%;
          left: 0;
          height: 3px;
        }
      }
    }
  }
`;

const MobileDropdownToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: transparent;
  border: none;
  color: ${white};
  font-size: 24px;
  font-weight: 500;
  margin: 0 auto;
  padding: 5px 10px;
  transition: color 0.3s ease;
  cursor: pointer;
  
  &:hover, &[aria-expanded="true"] {
    color: #fff;
  }
  
  &:after {
    content: '';
    position: absolute;
    width: ${props => props.isActive ? '60px' : '0'};
    height: 2px;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 60px;
  }
  
  svg {
    font-size: 26px;
    transition: transform 0.3s ease;
  }
`;

const MobileDropdownMenu = styled.ul`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: max-height 0.5s ease, opacity 0.3s ease, visibility 0.3s ease, padding 0.3s ease;
  overflow: hidden;
  padding: ${props => props.isOpen ? '10px' : '0'};
  margin-top: 10px !important;
  width: 100%;
  
  li {
    margin: 8px 0 !important;
    
    a {
      display: block;
      font-size: 18px !important;
      padding: 8px 15px !important;
      border-radius: 5px;
      transition: background-color 0.3s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      &.active {
        background: rgba(255, 255, 255, 0.15);
      }
    }
  }
`;

const MobilePhoneLink = styled.div`
  margin-top: 40px;
  
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