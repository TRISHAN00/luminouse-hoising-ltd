"use client";

import styled from "styled-components";
import Image from "next/image";
import {useEffect, useState} from "react";
import blur from '@/public/images/static/blur.jpg'

export const Img = ({
                        src,
                        srcSm,
                        position,
                        objectFit,
                        height,
                        width,
                        alt,
                        left,
                        margin,
                        right,
                        top,
                        bottom,
                        transition,

                    }) => {

    const [deviceWidth, setDeviceWidth] = useState(0);

    // set device width
    useEffect(() => {
        function HandleWidth() {
            setDeviceWidth(window.innerWidth)
        }

        window.addEventListener('resize', HandleWidth)
        HandleWidth()
        return () => {
            window.removeEventListener('resize', HandleWidth)
        };
    });

    return (
        <StyledImg className='global-image' objectFit={objectFit} margin={margin} position={position} left={left}
                   right={right} top={top}
                   bottom={bottom} height={height} width={width} transition={transition}>
            <Image blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQE..." placeholder={"blur"}
                   alt={alt ? alt : src} objectFit={'cover'} layout={'fill'}
                   src={src ? deviceWidth > 600 ? src : srcSm ? srcSm : src : blur}/>
        </StyledImg>
    );
};

const StyledImg = styled.div`
    position: ${props => props.position || 'absolute'};
    height: ${props => props.height || '100%'};
    width: ${props => props.width || '100%'};
    top: ${props => props.top || 0};
    left: ${props => props.left || 0};
    bottom: ${props => props.bottom || 0};
    right: ${props => props.right || 0};
    margin: ${props => props.margin || 0};
    overflow: hidden;

    img {
        ${props => props.transition && `transition: 1.4s ease`} //transition: 1.4s ease;
    }
`;
