"use client";
import { Black, hover, Transition } from "@/styles/globalStyleVars";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import styled from "styled-components";

const Button = ({
  onClick,
  text,
  src,
  icon, // custom icon (SVG, <Image>, or JSX)
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
      {text} {renderIcon()}
    </span>
  );

  return (
    <StyledBtn
      className={`${className || ""} dc-btn fade-up`}
      margin={margin}
      width={width}
      height={height}
      marginSm={marginSm}
    >
      {src ? (
        src.startsWith("http") || src.startsWith("www") ? (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize,
              fontWeight,
              color,
              backgroundColor: background,
              lineHeight,
              letterSpacing,
              borderRadius,
              border,
              borderColor,
            }}
          >
            {renderButtonContent()}
          </a>
        ) : (
          <Link href={src}>
            <a
              style={{
                fontSize,
                fontWeight,
                color,
                backgroundColor: background,
                lineHeight,
                letterSpacing,
                borderRadius,
                border,
                borderColor,
              }}
            >
              {renderButtonContent()}
            </a>
          </Link>
        )
      ) : (
        <a
          target={target || "_self"}
          style={{
            fontSize,
            fontWeight,
            color,
            backgroundColor: background,
            lineHeight,
            letterSpacing,
            borderRadius,
            border,
            borderColor,
          }}
        >
          {renderButtonContent()}
        </a>
      )}
    </StyledBtn>
  );
};

const StyledBtn = styled.div`
  &.dc-btn {
    margin: ${(props) => props.margin || "0"};
    width: ${(props) => props.width || "fit-content"};
    height: ${(props) => props.height || "44"}px;
    cursor: pointer;

    a {
      display: flex;
      width: fit-content;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: ${(props) => props.fontSize || "16"}px;
      font-weight: ${(props) => props.fontWeight || 500};
      margin: 0;
      line-height: ${(props) => props.lineHeight || "20"}px;
      background-color: ${(props) => props.background || `#FFF`};
      position: relative;
      border-radius: ${(props) => props.borderRadius || "22"}px;
      overflow: hidden;
      z-index: 0;
      transition: border 0.3s ease;
      padding: 12px 36px;
      box-sizing: border-box;
      border: ${(p) => p.border || "0"};
      border-color: ${(props) =>
        props.borderColor || props.hoverBackground || hover};
      color: ${(props) => props.color || `${Black}`};

      span {
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${(props) => props.color || `${Black}`};
        transition: color 0.3s ease;
        z-index: 2;

        .btn-icon {
          color: ${(props) => props.iconColor || props.color || `${Black}`};
          transition: color 0.3s ease;
        }

        img.btn-icon {
          transition: 0.3s ease;
          filter: ${(props) =>
            props.iconColor ? `brightness(0) saturate(100%)` : "none"};
        }
      }

      &:before {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 100%;
        left: 0;
        background-color: ${(p) => p.hoverBackground || hover};
        height: 100%;
        width: 100%;
        margin: auto;
        transition: all 0.5s ${Transition};
        border-radius: 22px;
      }

      &:hover {
        span {
          color: ${(props) => props.hoverColor || `#FFF`};

          .btn-icon {
            color: ${(props) =>
              props.hoverIconColor || props.iconColor || `#FFF`};
          }

          img.btn-icon {
            filter: ${(props) =>
              props.hoverIconColor
                ? `brightness(0) saturate(100%) invert(100%) sepia(0%) hue-rotate(0deg)`
                : "none"};
          }
        }

        &:before {
          top: 0;
        }

        border-color: ${(props) => props.hoverBackground || hover};
      }

      &:focus {
        color: #222222;
      }
    }

    @media (max-width: 600px) {
      ${(p) => (p.marginSm ? `margin:${p.marginSm}` : "")}
    }
  }
`;

export default Button;
