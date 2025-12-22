"use client";
import { Black, hover, Transition } from "@/styles/globalStyleVars";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import styled from "styled-components";

const Button = ({
  onClick,
  type = "button",
  text,
  src,
  icon,
  fontSize,
  fontWeight,
  color,
  letterSpacing,
  lineHeight,
  margin,
  background,
  borderRadius,
  border,
  width,
  height,
  hoverBackground,
  target,
  borderColor,
  hoverColor,
  iconColor,
  hoverIconColor,
  marginSm,
  className,
  loading,
}) => {
  const renderIcon = () => {
    if (!icon) return <FiArrowRight className="btn-icon" size={16} />;
    return typeof icon === "string" ? (
      <Image
        src={icon}
        alt="arrow"
        width={16}
        height={11.41}
        className="btn-icon"
      />
    ) : (
      icon
    );
  };

  const renderButtonContent = () => (
    <span>
      {loading ? "Submitting..." : text} {loading ? null : renderIcon()}
    </span>
  );

  if (src) {
    const linkProps = {
      style: {
        fontSize,
        fontWeight,
        color,
        backgroundColor: background,
        lineHeight,
        letterSpacing,
        borderRadius,
        border,
        borderColor,
      },
      className: "btn-link",
    };

    return (
      <StyledBtn
        as="div"
        className={`${className || ""} dc-btn fade-up`}
        margin={margin}
        width={width}
        height={height}
        marginSm={marginSm}
      >
        {src.startsWith("http") || src.startsWith("www") ? (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            {...linkProps}
          >
            {renderButtonContent()}
          </a>
        ) : (
          <Link href={src} passHref>
            <a {...linkProps}>{renderButtonContent()}</a>
          </Link>
        )}
      </StyledBtn>
    );
  }

  // Render as <button> inside forms
  return (
    <StyledBtn
      as="button"
      type={type}
      onClick={onClick}
      className={`${className || ""} dc-btn fade-up`}
      margin={margin}
      width={width}
      height={height}
      marginSm={marginSm}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      background={background}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      borderRadius={borderRadius}
      border={border}
      borderColor={borderColor}
      hoverBackground={hoverBackground}
      hoverColor={hoverColor}
      iconColor={iconColor}
      hoverIconColor={hoverIconColor}
      loading={loading}
    >
      {renderButtonContent()}
    </StyledBtn>
  );
};

const StyledBtn = styled.button`
  &.dc-btn {
    margin: ${(props) => props.margin || "0"};
    width: ${(props) => props.width || "fit-content"};
    height: ${(props) => props.height || "44"}px;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0;

    a,
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 36px;
      font-size: ${(props) => props.fontSize || "16"}px;
      font-weight: ${(props) => props.fontWeight || 500};
      line-height: ${(props) => props.lineHeight || "20"}px;
      letter-spacing: ${(props) => props.letterSpacing || "0.03em"};
      background-color: ${(props) => props.background || "#FFF"};
      border-radius: ${(props) => props.borderRadius || "22px"};
      border: ${(props) => props.border || "1px solid transparent"};
      border-color: ${(props) =>
        props.borderColor || props.hoverBackground || hover};
      color: ${(props) => props.color || Black};
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      z-index: 1;

      .btn-icon {
        margin-left: 8px;
        color: ${(props) => props.iconColor || props.color || Black};
        transition: color 0.3s ease;
      }

      img.btn-icon {
        transition: 0.3s ease;
        filter: ${(props) =>
          props.iconColor ? `brightness(0) saturate(100%)` : "none"};
      }
    }

    a::before,
    span::before {
      content: "";
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.hoverBackground || hover};
      transition: all 0.5s ${Transition};
      z-index: -1;
      border-radius: ${(props) => props.borderRadius || "22px"};
    }

    a:hover::before,
    span:hover::before {
      top: 0;
    }

    a:hover,
    span:hover {
      color: ${(props) => props.hoverColor || "#FFF"};
      border-color: ${(props) => props.hoverBackground || hover};

      .btn-icon {
        color: ${(props) => props.hoverIconColor || props.iconColor || "#FFF"};
      }

      img.btn-icon {
        filter: ${(props) =>
          props.hoverIconColor
            ? `brightness(0) saturate(100%) invert(100%) sepia(0%) hue-rotate(0deg)`
            : "none"};
      }
    }

    @media (max-width: 600px) {
      ${(p) => (p.marginSm ? `margin:${p.marginSm}` : "")}
    }
  }
`;

export default Button;
