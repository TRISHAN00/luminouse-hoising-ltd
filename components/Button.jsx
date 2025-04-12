'use client'
import { Black, hover, Transition } from "@/styles/globalStyleVars";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import styled from 'styled-components';

const Button = ({
  onClick,
  text,
  src,
  icon, // custom icon (can be SVG, <Image>, or JSX)
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
  marginSm,
  iconColor,
  className
}) => {

  const renderIcon = () => {
    if (!icon) return <FiArrowRight color={iconColor || '#171717'} size={16} />;
    return typeof icon === 'string' ? (
      <Image src={icon} alt="arrow" width={16} height={11.41} />
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
      onClick={onClick}
      className={`${className || ""} dc-btn fade-up`}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      background={background}
      lineHeight={lineHeight}
      letterSpacing={letterSpacing}
      margin={margin}
      border={border}
      borderRadius={borderRadius}
      width={width}
      height={height}
      hoverBackground={hoverBackground}
      borderColor={borderColor}
      target={target}
      hoverColor={hoverColor}
      marginSm={marginSm}
    >
      {src ? (
        src.startsWith('http') || src.startsWith('www') ? (
          <a href={src} target="_blank" rel="noopener noreferrer">
            {renderButtonContent()}
          </a>
        ) : (
          <Link href={src}>
            {renderButtonContent()}
          </Link>
        )
      ) : (
        <a target={target || '_self'}>
          {renderButtonContent()}
        </a>
      )}
    </StyledBtn>
  );
};

const StyledBtn = styled.div`
  &.dc-btn {
    margin: ${props => props.margin || '0'};
    width: ${props => props.width || 'fit-content'};
    height: ${props => props.height || '44'}px;
    cursor: pointer;

    a {
      display: flex;
      width: fit-content;
      height: 100%;
      align-items: center;
      justify-content: center;
      font-size: ${props => props.fontSize || '16'}px;
      font-weight: ${props => props.fontWeight || 500};
      margin: 0;
      line-height: ${props => props.lineHeight || '20'}px;
      background-color: ${props => props.background || `#FFF`};
      position: relative;
      border-radius: ${props => props.borderRadius || '22'}px;
      overflow: hidden;
      z-index: 0;
      transition: border .3s ease;
      padding: 12px 36px;
      box-sizing: border-box;
      border: ${p => p.border || "0"};
      border-color: ${props => props.hoverBorderColor || props.hoverBackground || hover};
      color: ${props => props.color || `${Black}`};

      span {
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${props => props.color || `${Black}`};
        transition: color .3s ease;
        z-index: 2;

        svg, img {
          transition: .6s ${Transition};
        }
      }

      &:before {
        content: "";
        display: block;
        position: absolute;
        right: 0;
        top: 100%;
        left: 0;
        background-color: ${p => p.hoverBackground || hover};
        height: 100%;
        width: 100%;
        margin: auto;
        transition: all .5s ${Transition};
        border-radius: 22px;
      }

      &:hover {
        span {
          color: ${props => props.hoverColor || `#FFF`};
        }

        svg, img {
          filter: invert(92%) sepia(99%) saturate(1%) hue-rotate(235deg) brightness(105%) contrast(100%);
        }

        &:before {
          top: 0;
        }

        border-color: ${props => props.hoverBackground || hover};

      }

      &:focus {
        color: #222222;
      }
    }

    @media (max-width: 600px) {
      ${p => p.marginSm ? `margin:${p.marginSm}` : ''}
    }
  }
`;

export default Button;
