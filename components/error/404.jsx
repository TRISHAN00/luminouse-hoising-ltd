'use client'
import styled from "styled-components";
import {Col, Container, Row} from "react-bootstrap";
import {Img} from "@/components/Img";
import Button from "@/components/Button";

const ErrorPage = () => {

    return (
        <StyledErrorPage className='StyledErrorPage'>
            <Img src={"/images/static/404.jpg"}/>
            <Container>
                <Row>
                    <Col sm={{span: 8, offset: 4}}>
                        <h1>Page <br/>
                            not found </h1>
                        <Button margin={'50px 0 0 0'} marginSm={"30px 0 0 0"} src={"/"} text="Return Home"/>
                    </Col>
                </Row>
            </Container>
        </StyledErrorPage>
    );
};

const StyledErrorPage = styled.div`
  background: #e9e9e9;
  position: relative;
  padding-top: 200px;
  height: ${`100svh`};
  overflow: hidden;

  h1 {
    font-size: 120px;
    line-height: 140px;
  }


  @media (max-width: 991px) {
    .col-sm-8 {
      min-width: 100%;
      margin: 0;
    }
  }
  @media (max-width: 600px) {
    h1 {
      font-size: 80px;
      line-height: 80px;
    }
  }
`;
export default ErrorPage;
