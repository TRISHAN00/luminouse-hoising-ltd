'use client'
import React from 'react';
import styled from "styled-components";
import {Container} from "react-bootstrap";
import reactHtmlParser from "react-html-parser";
import {Img} from "@/components/Img";

const InnerBanner = ({img, text, title}) => {
    return (
        <StyledInnerBanner className='InnerBanner'>
            <Img banner={true} src={img}/>
            <Container>
                <h2 className={`anim-active fade-up`}>{reactHtmlParser('Inner Banner title')}</h2>
            </Container>
        </StyledInnerBanner>
    );
};

const StyledInnerBanner = styled.section`
    padding-top: calc(620 / 1366 * 100%);
    position: relative;
    background-color: #DDD;

    &:after {
        content: '';
        position: absolute;
        background-color: rgba(0, 0, 0, 0.25);
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
    }

    .container {
        position: absolute;
        //height: 100%;
        //top: 0;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 94px;
        z-index: 2;
    }

    h2 {
        //position: absolute;
        left: 15px;
        //bottom: 94px;
        color: #ffffff;
        font-size: 60px;
        font-weight: 300;
        line-height: 70px;
        //text-transform: capitalize;
        z-index: 2;

        span {
            font-weight: 600;
            color: #ffffff;
        }
    }

    @media (min-width: 767px) {
        .title {
            width: 50%;
        }
    }

    @media (max-width: 767px) {
        //padding-top: 0;
        padding-top: calc(560 / 414 * 100%);
        .container {
            bottom: 69px;
        }

        .title {
            margin-bottom: 40px !important;
        }

        h2 {
            font-size: 40px;
            line-height: 45px;
        }
    }
`;

export default InnerBanner;
