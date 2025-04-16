"use client";
import { Col, Container, Row } from "react-bootstrap";
import { BsCameraVideoFill, BsShieldCheck, BsWifi } from "react-icons/bs";
import { FaCarSide, FaDoorClosed, FaSwimmingPool } from "react-icons/fa";
import { MdOutlineAir, MdOutlineDesignServices, MdOutlineElevator, MdOutlinePower } from "react-icons/md";
import styled from "styled-components";
import Title from "../Title";

export default function FeaturedAmenities() {
  return (
    <FeaturedAmenitiesStyled>
      <Container>
        <Row>
          <Col lg={12}>
            <Title center color={"#5B5B5B"} fontSize={"60"} text={"FEATURED AMENITIES"} />
          </Col>
          <Col className="box-wrapper" lg={12}>
            {/* First Row */}
            <div className="box-wrapper__card">
              <BsCameraVideoFill color="#5B5B5B" fontSize={60} />
              <h4>CCTV</h4>
              <p>Monitoring</p>
            </div>
            <div className="box-wrapper__card">
              <MdOutlinePower color="#5B5B5B" fontSize={60} />
              <h4>24 Hours</h4>
              <p>Power Backup</p>
            </div>
            <div className="box-wrapper__card">
              <MdOutlineElevator color="#5B5B5B" fontSize={60} />
              <h4>High Quality</h4>
              <p>Lift</p>
            </div>
            <div className="box-wrapper__card">
              <BsShieldCheck color="#5B5B5B" fontSize={60} />
              <h4>High</h4>
              <p>Security</p>
            </div>
            <div className="box-wrapper__card">
              <FaCarSide color="#5B5B5B" fontSize={60} />
              <h4>Wide Parking</h4>
              <p>Area</p>
            </div>

            {/* Second Row */}
            <div className="box-wrapper__card">
              <MdOutlineDesignServices color="#5B5B5B" fontSize={60} />
              <h4>Modern Exterior</h4>
              <p>Design</p>
            </div>
            <div className="box-wrapper__card">
              <BsWifi color="#5B5B5B" fontSize={60} />
              <h4>In House Wi-Fi</h4>
              <p>Connection</p>
            </div>
            <div className="box-wrapper__card">
              <FaDoorClosed color="#5B5B5B" fontSize={60} />
              <h4>Digital Security</h4>
              <p>System</p>
            </div>
            <div className="box-wrapper__card">
              <MdOutlineAir color="#5B5B5B" fontSize={60} />
              <h4>Space for Open Party</h4>
              <p>on Roof</p>
            </div>
            <div className="box-wrapper__card">
              <FaSwimmingPool color="#5B5B5B" fontSize={60} />
              <h4>Roof Top</h4>
              <p>Swimming Pool</p>
            </div>
          </Col>
        </Row>
      </Container>
    </FeaturedAmenitiesStyled>
  );
}

const FeaturedAmenitiesStyled = styled.section`
  padding: 100px 0;
  color: #5b5b5b;

  .box-wrapper {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;

    &__card {
      height: 300px;
      width: 300px;
      border: 1px solid #e0e0e0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: -1px;
      margin-bottom: -1px;
      padding: 20px;
      transition: all 0.3s ease;

      &:hover {
        background-color: #f9f9f9;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        border: none;
        transform: translateY(-5px);
      }

      h4 {
        margin-top: 15px;
        margin-bottom: 5px;
        font-size: 22px;
        font-weight: 400;
        text-align: center;
      }

      p {
        margin: 0;
        font-size: 16px;
        text-align: center;
        color: #777;
      }
    }
  }

  @media (max-width: 768px) {
    .box-wrapper__card {
      height: 180px;
      width: 180px;
    }
  }

  @media (max-width: 576px) {
    .box-wrapper__card {
      height: 150px;
      width: 150px;
    }
  }
`;