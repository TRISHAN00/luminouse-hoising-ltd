"use client";
import { Img } from "@/components/Img";
import reactHtmlParser from "html-react-parser";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

const InnerBannerConcern = ({ img, text, title, address }) => {
  return (
    <StyledInnerBanner className="InnerBanner">
      <Img banner={true} src={img} />
      <div className="gradient-overlay"></div>
      
      <Container>
        <Row className="content-wrapper">
          <Col lg={address ? 7 : 12} md={address ? 7 : 12}>
            <div className="title-container anim-active fade-up">
              <div className="accent-line"></div>
              <h2>{reactHtmlParser(title)}</h2>
              <div className="accent-line right"></div>
            </div>
          </Col>
          
          {address && (
            <Col lg={5} md={5}>
              <div className="factory-address-wrapper anim-active fade-left">
                <div className="address-backdrop"></div>
                <div className="factory-address-card">
                  <div className="card-icon">
                    <div className="icon-circle">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 22h20"></path>
                        <path d="M17 22V2H7v20"></path>
                        <path d="M12 7v.01"></path>
                        <path d="M7 11h10"></path>
                        <path d="M7 15h10"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="card-content">
                    <h3>Manufacturing Unit</h3>
                    <div className="divider">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div className="address-content">
                      {reactHtmlParser(address)}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          )}
        </Row>
      </Container>
      
      <div className="bottom-accent"></div>
    </StyledInnerBanner>
  );
};

const StyledInnerBanner = styled.section`
  padding-top: calc(720 / 1366 * 100%);
  position: relative;
  background-color: #171717;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
  
  .gradient-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0));
    z-index: 1;
  }
  
  .bottom-accent {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #b99764, #e9bf7c, #b99764);
    z-index: 10;
  }

  .container {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 94px;
    z-index: 2;
  }

  .content-wrapper {
    display: flex;
    align-items: center;
  }
  
  .title-container {
    position: relative;
    padding: 20px 0;
    
    .accent-line {
      height: 2px;
      width: 80px;
      background: linear-gradient(to right, transparent, #b99764, transparent);
      margin-bottom: 25px;
      
      &.right {
        margin-left: auto;
        margin-top: 25px;
        margin-bottom: 0;
      }
    }
  }

  h2 {
    color: #ffffff;
    font-size: 60px;
    font-weight: 400;
    line-height: 1.2;
    text-transform: unset;
    position: relative;
    text-shadow: 0 2px 15px rgba(0, 0, 0, 0.3);

    span {
      font-weight: 600;
      color: #b99764;
      position: relative;
      
      &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(to right, transparent, #b99764, transparent);
      }
    }
  }

  .factory-address-wrapper {
    position: relative;
    padding: 20px 0;
    
    .address-backdrop {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%) rotate(0deg);
      width: 100%;
      height: 100%;
      background: rgba(23, 23, 23, 0.7);
      border-radius: 10px;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
      z-index: 1;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      border-left: 1px solid rgba(255, 255, 255, 0.1);
    }
  }

  .factory-address-card {
    position: relative;
    display: flex;
    z-index: 2;
    padding: 30px;
    
    .card-icon {
      margin-right: 20px;
      
      .icon-circle {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #b99764, #e9bf7c);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #171717;
        box-shadow: 0 5px 15px rgba(185, 151, 100, 0.3);
      }
    }
    
    .card-content {
      flex: 1;
      
      h3 {
        margin: 0;
        font-size: 22px;
        font-weight: 600;
        color: #b99764;
        letter-spacing: 1px;
        margin-bottom: 12px;
      }
      
      .divider {
        display: flex;
        margin-bottom: 18px;
        
        span {
          height: 2px;
          margin-right: 6px;
          
          &:nth-child(1) {
            width: 12px;
            background-color: #b99764;
          }
          
          &:nth-child(2) {
            width: 30px;
            background-color: rgba(185, 151, 100, 0.7);
          }
          
          &:nth-child(3) {
            width: 12px;
            background-color: rgba(185, 151, 100, 0.4);
          }
        }
      }
      
      .address-content {
        font-size: 16px;
        line-height: 1.7;
        color: #ffffff;
        
        p {
          margin-bottom: 12px;
          
          &:last-child {
            margin-bottom: 0;
          }
        }
        
        a {
          color: #b99764;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          
          &:after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background-color: #b99764;
            transition: width 0.3s ease;
          }
          
          &:hover {
            color: #e9bf7c;
            
            &:after {
              width: 100%;
            }
          }
        }
      }
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    h2 {
      font-size: 48px;
    }
    
    .factory-address-card {
      padding: 20px;
      
      .card-icon {
        margin-right: 15px;
        
        .icon-circle {
          width: 50px;
          height: 50px;
        }
      }
      
      .card-content {
        h3 {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width: 767px) {
    padding-top: calc(600 / 414 * 100%);
    
    .container {
      bottom: 60px;
    }
    
    .content-wrapper {
      flex-direction: column;
    }
    
    .title-container {
      .accent-line {
        width: 60px;
        margin-bottom: 15px;
        
        &.right {
          margin-top: 15px;
        }
      }
    }

    h2 {
      font-size: 36px;
      text-align: center;
      margin-bottom: 15px;
    }
    
    .factory-address-wrapper {
      width: 100%;
      max-width: 340px;
      margin: 25px auto 0;
      
      .address-backdrop {
        transform: translateY(-50%) rotate(0);
      }
    }
    
    .factory-address-card {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 25px 20px;
      
      .card-icon {
        margin-right: 0;
        margin-bottom: 15px;
      }
      
      .card-content {
        .divider {
          justify-content: center;
          
          span {
            &:nth-child(1) {
              width: 12px;
            }
            
            &:nth-child(2) {
              width: 30px;
            }
            
            &:nth-child(3) {
              width: 12px;
            }
          }
        }
      }
    }
  }
`;

export default InnerBannerConcern;