"use client";

import { white } from "@/styles/globalStyleVars";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { MdExpandMore, MdOutlineLocalPhone } from "react-icons/md";
import styled from "styled-components";
import livousDenimLogo from "../public/images/static/logos/Livous_denim.svg";
import luminouseArchLogo from "../public/images/static/logos/luminouse-arch.svg";
import mainLogo from "../public/images/static/logos/main-logo.svg";

export default function Menu({
  isNewsDetail,
  isLivousDenim,
  isLuminouseArch,
  settingsData,
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const headerRef = useRef(null);
  const router = usePathname();
  const whatApp = settingsData?.data?.office_phone;

  const getLogo = isLivousDenim
    ? livousDenimLogo
    : isLuminouseArch
    ? luminouseArchLogo
    : mainLogo;

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 300) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Enhanced mobile menu toggle with animation state
  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      setIsMenuAnimating(true);
      setTimeout(() => {
        setMobileMenuOpen(false);
        setMobileActiveDropdown(null);
        setIsMenuAnimating(false);
      }, 300);
    } else {
      setMobileMenuOpen(true);
      setIsMenuAnimating(false);
    }
  };

  // Smooth dropdown toggle
  const toggleMobileDropdown = (index) => {
    if (mobileActiveDropdown === index) {
      setMobileActiveDropdown(null);
    } else {
      setMobileActiveDropdown(index);
    }
  };

  // Close menu on link click
  const handleLinkClick = () => {
    setMobileActiveDropdown(null);
    toggleMobileMenu();
  };

  const isActive = (path) => {
    return router === path;
  };

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
        {
          label: "Luminous Design & Architecture Associates Ltd",
          href: "/luminouse-architecture",
        },
      ],
    },
    {
      label: "Our Clients",
      href: "#",
      hasDropdown: true,
      dropdownItems: [
        { label: "Landowner", href: "/landowner" },
        { label: "Buyer", href: "/buyer" },
      ],
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
              <LogoWrapper isScrolled={isScrolled}>
                <Image
                  src={getLogo}
                  alt="Main Logo"
                  width={isLivousDenim ? 200 : isLuminouseArch ? 150 : 100}
                  priority
                />
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
                      className={item.hasDropdown ? "has-dropdown" : ""}
                    >
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
                                  className={
                                    isActive(dropItem.href) ? "active" : ""
                                  }
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
                <a href={`tel:01700744342`}>
                  <MdOutlineLocalPhone />
                </a>
              </PhoneIcon>

              {/* Enhanced Mobile Menu Toggle */}
              <MobileMenuToggle
                onClick={toggleMobileMenu}
                isOpen={mobileMenuOpen}
              >
                <HamburgerIcon isOpen={mobileMenuOpen}>
                  <span></span>
                  <span></span>
                  <span></span>
                </HamburgerIcon>
              </MobileMenuToggle>
            </HeaderRight>
          </Col>
        </Row>
      </Container>

      {/* Enhanced Mobile Menu Overlay */}
      <MobileMenuOverlay
        isOpen={mobileMenuOpen}
        isAnimating={isMenuAnimating}
        onClick={(e) => e.target === e.currentTarget && toggleMobileMenu()}
      >
        <MobileMenuContainer isOpen={mobileMenuOpen}>
          <MobileMenuHeader>
            <MobileMenuLogo>
              <Image src={getLogo} alt="Mobile Logo" width={200} height={100} />
            </MobileMenuLogo>
          </MobileMenuHeader>

          <MobileNavMenu>
            <ul>
              {menuItems.map((item, index) => (
                <MobileMenuItem
                  key={index}
                  delay={index * 0.1}
                  isOpen={mobileMenuOpen}
                >
                  {item.hasDropdown ? (
                    <>
                      <MobileDropdownToggle
                        onClick={() => toggleMobileDropdown(index)}
                        isActive={mobileActiveDropdown === index}
                      >
                        <span>{item.label}</span>
                        <DropdownIcon isOpen={mobileActiveDropdown === index}>
                          <MdExpandMore />
                        </DropdownIcon>
                      </MobileDropdownToggle>
                      <MobileDropdownMenu
                        isOpen={mobileActiveDropdown === index}
                      >
                        {item.dropdownItems.map((dropItem, dropIndex) => (
                          <MobileDropdownItem
                            key={dropIndex}
                            delay={dropIndex * 0.05}
                            isOpen={mobileActiveDropdown === index}
                          >
                            <Link
                              href={dropItem.href}
                              className={
                                isActive(dropItem.href) ? "active" : ""
                              }
                              onClick={handleLinkClick}
                            >
                              {dropItem.label}
                            </Link>
                          </MobileDropdownItem>
                        ))}
                      </MobileDropdownMenu>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleLinkClick}
                      className={isActive(item.href) ? "active" : ""}
                    >
                      {item.label}
                    </Link>
                  )}
                </MobileMenuItem>
              ))}
            </ul>

            <MobilePhoneLink isOpen={mobileMenuOpen}>
              <Link href={`tel:01700744342`} onClick={handleLinkClick}>
                <MdOutlineLocalPhone />
                <span>Call Us Now</span>
              </Link>
            </MobilePhoneLink>
          </MobileNavMenu>
        </MobileMenuContainer>
      </MobileMenuOverlay>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  padding: ${(props) => (props.isScrolled ? "10px 0" : "20px 0")};
  z-index: 1000;
  transition: all 0.4s ease, transform 0.3s ease, background-color 0.3s ease,
    box-shadow 0.3s ease;
  transform: translateY(${(props) => (props.isVisible ? "0" : "-100%")});
  background: ${(props) =>
    props.isScrolled || props.isNewsDetail
      ? "rgba(0, 0, 0, 0.85)"
      : "transparent"};
  backdrop-filter: ${(props) => (props.isScrolled ? "blur(10px)" : "none")};
  box-shadow: ${(props) =>
    props.isScrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none"};

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${(props) => (props.isScrolled ? "5px" : "0")};
    background: linear-gradient(to right, transparent, #fff, transparent);
    opacity: 0.7;
  }

  @media (max-width: 991px) {
    padding: ${(props) => (props.isScrolled ? "8px 0" : "15px 0")};
  }
`;

const LogoWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 8px 15px;
  border-radius: 8px;
  background-color: ${(props) =>
    props.isScrolled ? "transparent" : "rgba(0, 0, 0, 0.6)"};
  box-shadow: ${(props) =>
    props.isScrolled ? "none" : "0 2px 10px rgba(0, 0, 0, 0.2)"};
  transition: all 0.3s ease;

  img {
    max-width: 100%;
    height: auto;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.isScrolled ? "transparent" : "rgba(0, 0, 0, 0.75)"};
  }

  @media (max-width: 767px) {
    padding: 6px 10px;
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

    @media (min-width: 992px) and (max-width: 1200px) {
      gap: 15px;
    }

    @media (min-width: 768px) and (max-width: 991px) {
      gap: 15px;
    }

    @media (max-width: 767px) {
      gap: 15px;
    }

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
  font-size: 14px;
  position: relative;
  transition: color 0.3s ease;
  padding: 5px 0;
  display: flex;
  align-items: center;
  gap: 5px;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  @media (min-width: 992px) and (max-width: 1200px) {
    font-size: 12px;
  }

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

  &:hover::after,
  &.active::after {
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
    content: "";
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
    background-color: #0288d1;
    color: #fff;
    font-size: 22px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

    &:hover {
      background-color: #fff;
      color: #0288d1;
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
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 991px) {
    display: block;
  }
`;

const HamburgerIcon = styled.div`
  width: 24px;
  height: 18px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background: ${white};
    border-radius: 1px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;

    &:nth-child(1) {
      transform: ${(props) =>
        props.isOpen
          ? "rotate(45deg) translateY(8px)"
          : "rotate(0) translateY(0)"};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.isOpen ? "0" : "1")};
      transform: ${(props) => (props.isOpen ? "scale(0)" : "scale(1)")};
    }

    &:nth-child(3) {
      transform: ${(props) =>
        props.isOpen
          ? "rotate(-45deg) translateY(-8px)"
          : "rotate(0) translateY(0)"};
    }
  }
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.97);
  backdrop-filter: blur(20px);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  overflow-y: auto;
  padding: 20px;
`;

const MobileMenuContainer = styled.div`
  width: 100%;
  max-width: 400px;
  transform: ${(props) =>
    props.isOpen ? "translateY(0) scale(1)" : "translateY(-50px) scale(0.9)"};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) => (props.isOpen ? "0.1s" : "0s")};
  margin-top: 80px;
`;

const MobileMenuHeader = styled.div`
  text-align: center;
  padding: 20px 0 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 30px;
`;

const MobileMenuLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    filter: brightness(1.2);
  }
`;

const MobileNavMenu = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const MobileMenuItem = styled.li`
  margin: 0;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(-30px)"};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) =>
    props.isOpen ? `${props.delay + 0.2}s` : "0s"};

  > a {
    display: block;
    color: ${white};
    font-size: 22px;
    font-weight: 600;
    padding: 15px 20px;
    margin: 8px 0;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.1),
        transparent
      );
      transition: left 0.5s ease;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(10px);
      border-color: rgba(255, 255, 255, 0.2);

      &:before {
        left: 100%;
      }
    }

    &.active {
      background: rgba(2, 136, 209, 0.2);
      border-color: #0288d1;
      color: #64b5f6;
    }
  }
`;

const MobileDropdownToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  padding: 15px 20px;
  margin: 8px 0;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(10px);
    border-color: rgba(255, 255, 255, 0.2);

    &:before {
      left: 100%;
    }
  }

  span {
    flex-grow: 1;
    text-align: left;
  }
`;

const DropdownIcon = styled.div`
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};

  svg {
    font-size: 24px;
  }
`;

const MobileDropdownMenu = styled.ul`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  max-height: ${(props) => (props.isOpen ? "300px" : "0")};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  margin: 8px 0 0 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const MobileDropdownItem = styled.li`
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) =>
    props.isOpen ? `${props.delay + 0.1}s` : "0s"};

  a {
    display: block;
    font-size: 18px !important;
    font-weight: 500 !important;
    padding: 12px 20px !important;
    margin: 0 !important;
    border-radius: 0 !important;
    background: transparent !important;
    border: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
    transition: all 0.3s ease !important;

    &:hover {
      background: rgba(255, 255, 255, 0.1) !important;
      transform: translateX(10px) !important;
      padding-left: 30px !important;
    }

    &.active {
      background: rgba(2, 136, 209, 0.2) !important;
      color: #64b5f6 !important;
    }

    &:last-child {
      border-bottom: none !important;
    }
  }
`;

const MobilePhoneLink = styled.div`
  margin-top: 40px;
  text-align: center;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(20px)"};
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: ${(props) => (props.isOpen ? "0.6s" : "0s")};
  color: "white";

  a {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #0288d1, #0277bd);
    color: white;
    padding: 16px 32px;
    border-radius: 50px;
    font-size: 18px;
    font-weight: 600;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba(2, 136, 209, 0.3);
    position: relative;
    overflow: hidden;
    color: "white";

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      transition: left 0.6s ease;
    }

    &:hover {
      background: linear-gradient(135deg, #0277bd, #01579b);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 8px 30px rgba(2, 136, 209, 0.5);

      &:before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-1px) scale(1.02);
    }

    svg {
      font-size: 22px;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%,
      100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
  }
`;
