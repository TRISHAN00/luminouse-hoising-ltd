'use client'
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const MyComponent = ({data}) => {
    return (
        <StyledComponent className={'post-wrap'}>
            <Container>
                <Row>
                    {data?.map(i => (
                        <Col key={i?.id} sm={4}>
                            <div className="post-wrap__single">
                                <Link href={`/project/${i?.id}`}/>
                                <h4>{i?.title}</h4>
                            </div>
                        </Col>
                    ))}

                </Row>
            </Container>
        </StyledComponent>
    );
};

export default MyComponent;

const StyledComponent = styled.section`
    margin-top: 100px;
    overflow: hidden;

    .col-sm-4 {
        margin-bottom: 30px;

    }

    .post-wrap__single {
        border: 1px solid #DDD;
        min-height: 100%;
        padding: 20px;
        position: relative;

        a {
            position: absolute;
            inset: 0;
            z-index: 2;
        }

        &:hover {
            h4 {
                color: red;
            }
        }
    }
`;
