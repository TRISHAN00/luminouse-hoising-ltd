'use client'
import arrow from '@/public/images/static/arrow-right.svg';
import { Black, hover, Transition } from "@/styles/globalStyleVars";
import Image from "next/image";
import Link from "next/link";
import styled from 'styled-components';

const Button = ({
                    onSubmit,
                    text,
                    src,
                    img,
                    hoverImg,
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
                    icon,
                    marginSm,
                    onClick,
                    className
                }) => {


    return (
        <StyledBtn onClick={onClick} className={`${className ? className : null} dc-btn fade-up`}
                   fontSize={fontSize}
                   fontWeight={fontWeight}
                   color={color}
                   background={background}
                   lineHeight={lineHeight}
                   letterSpacing={letterSpacing}
                   margin={margin}
                   border={border}
                   img={img}
                   borderRadius={borderRadius}
                   width={width}
                   hoverImg={hoverImg}
                   hoverBackground={hoverBackground}
                   height={height}
                   borderColor={borderColor}
                   target={target}
                   hoverColor={hoverColor}
                   onSubmit={onSubmit}
                   icon={icon}
                   marginSm={marginSm}
        >
            {src && typeof src === 'string' ? (
                src?.startsWith('http') || src?.startsWith('www') ? (
                    <a href={src} target="_blank" rel="noopener noreferrer">
                        <span>{text} <Image height={11.41} width={16} src={icon ? icon : arrow} alt=""/></span>
                    </a>
                ) : (
                    <Link href={src || '/'}>
                        <span>{text} <Image height={11.41} width={16} src={icon ? icon : arrow} alt=""/></span>
                    </Link>
                )
            ) : (
                <a target={target || '_self'}>
                    <span>{text} <Image height={11.41} width={16} src={icon ? icon : arrow} alt=""/></span>
                </a>
            )}

        </StyledBtn>
    )
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
            color: ${props => props.color || `${Black}`};

            span {
                transition: color .3s ease;
                color: ${props => props.color || `${Black}`};
                position: relative;
                z-index: 2;

                img {
                    padding-left: 5px;
                    filter: none;
                    transition: .6s ${Transition};
                        // ${p => !p.icon && `display:none`}
                }
            }

            &:before {
                //bottom: 0;
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

                img {
                    filter: invert(92%) sepia(99%) saturate(1%) hue-rotate(235deg) brightness(105%) contrast(100%);
                }

                &:before {
                    top: 0
                }
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
