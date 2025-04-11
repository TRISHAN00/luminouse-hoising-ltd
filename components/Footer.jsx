"use client"
import { Black, hover, Transition } from "@/styles/globalStyleVars";
import axios from 'axios';
import Link from "next/link";
import { useEffect, useState } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Title from "./Title";


const MyComponent = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get('https://bestinbd.com/projects/web/Digitomark/api/get-req-data/settings-data')
            .then(function (response) {
                setData(response)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);


    const footerData = data?.data?.data;

    return (
        <StyledComponent className="footer">
            <Container>
                <Row>
                    <Col sm={9} className={"footer__title"}>
                        <Title marginSm={'0 0 50px 0'} margin={"0 0 120px 0"} color={"#FFF"}
                               text={"Let's talk about <br/> your next project"}/>
                        <a href={`tel:${footerData && footerData?.office_phone}`}>{footerData && footerData?.office_phone}</a>
                        <a href={`mailto:${footerData && footerData?.info_email}`}>{footerData && footerData?.info_email}</a>
                    </Col>
                    <Col sm={3}>
                        <ul className={"footer__social"}>
                            <li><a target={"_blank"} href={footerData && footerData?.facebook}><img
                                src="/images/static/fb.svg" alt=""/></a></li>
                            <li><a target={"_blank"} href={footerData && footerData?.twitter}><img
                                src="/images/static/x.svg" alt=""/></a></li>
                            <li><a target={"_blank"} href={footerData && footerData?.linkedin}><img
                                src="/images/static/in.svg"
                                alt=""/></a></li>
                            <li><a target={"_blank"} href={footerData && footerData?.instagram}><img
                                src="/images/static/insta.svg" alt=""/></a></li>
                            <li><a target={"_blank"} href={footerData && footerData?.youtube}><img
                                src="/images/static/youtube.svg" alt=""/></a></li>
                        </ul>
                    </Col>

                    <Col sm={12}>
                        <div className={"footer__menu"}>
                            <ul>
                                <li><Link href={'/'}>Organic Marketing</Link></li>
                                <li><Link href={'/'}>Paid Marketing</Link></li>
                                <li><Link href={'/'}>Creative Design</Link></li>
                                <li><Link href={'/'}>Web Design</Link></li>
                                <li><Link href={'/'}>Copy Writing</Link></li>
                                <li><Link href={'/'}>Visual Arts</Link></li>
                            </ul>
                        </div>

                        <div className="footer__copyright">
                            <p>© {new Date().getFullYear()} Digitomark Limited</p>
                        </div>
                    </Col>

                </Row>
            </Container>
        </StyledComponent>
    );
};

const StyledComponent = styled.section`
    background-color: ${Black};
    padding-top: 100px;

    .footer__title {
        a {
            font-size: 32px;
            line-height: 36px;
            color: #ffffff;
            display: flex;
            width: fit-content;

            &:nth-last-of-type(1) {
                margin-top: 15px;
            }
        }
    }

    .footer__social {
        li {
            height: 35px;
            width: 35px;
            border: 1px solid #FFF;
            border-radius: 50%;
            margin-left: auto;
            margin-bottom: 15px;
            overflow: hidden;

            a {
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
                justify-content: center;
                position: relative;
                overflow: hidden;

                img {
                    height: 12px;
                    position: relative;
                    z-index: 2;
                }

                &:after {
                    content: '';
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: ${hover};
                    border-radius: 50%;
                    transition: all .6s ${Transition};
                }

                &:hover {
                    &:after {
                        top: 0;
                    }
                }
            }
        }
    }

    .footer__menu {
        padding-top: 30px;
        margin-top: 30px;
        border-top: 1px solid #FFF;

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                margin-right: 40px;
                margin-bottom: 10px;

                a {
                    color: #ffffff;
                    font-size: 16px;
                    line-height: 20px;
                    font-weight: 500;

                }
            }
        }
    }

    .footer__copyright {
        margin-top: 50px;
        margin-bottom: 60px;

        p {
            font-size: 12px;
            line-height: 16px;
            color: #999999;
        }
    }

    @media (max-width: 991px) {
        .title h2 {
            font-size: 48px;
            line-height: 48px;
        }
    }

    @media (max-width: 575px) {
        .footer__social {
            display: flex;
            margin-top: 50px;

            li {
                display: flex;
                margin: 0 15px 0;
            }
        }

        .footer__menu {
            margin-top: 40px;
            padding-top: 40px;

            ul {
                li {
                    width: 100%;

                    &:not(:nth-last-of-type(1)) {
                        margin-bottom: 30px;
                    }

                    a {
                        display: block;
                        width: fit-content;
                    }
                }
            }
        }

        .footer__copyright {
            margin-bottom: 30px;
            margin-top: 30px;
        }
    }
`;

export default MyComponent;
