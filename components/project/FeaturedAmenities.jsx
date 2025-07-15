"use client";
import { Col, Container, Row } from "react-bootstrap";
import { BsCameraVideoFill, BsShieldCheck, BsWifi } from "react-icons/bs";
import { FaCarSide, FaDoorClosed, FaSwimmingPool } from "react-icons/fa";
import {
  MdOutlineAir,
  MdOutlineDesignServices,
  MdOutlineElevator,
  MdOutlinePower,
} from "react-icons/md";
import styled from "styled-components";
import Title from "../Title";

export default function FeaturedAmenities({ amenitiesData }) {
  // Icon mapping based on the titles from your data
  const getIconForTitle = (title) => {
    const iconMap = {
      CCTV: <BsCameraVideoFill color="#171717" fontSize={60} />,
      "24 Hours": <MdOutlinePower color="#171717" fontSize={60} />,
      "High Quality": <MdOutlineElevator color="#171717" fontSize={60} />,
      High: <BsShieldCheck color="#171717" fontSize={60} />,
      "Wide Parking": <FaCarSide color="#171717" fontSize={60} />,
      "Modern Exterior": (
        <MdOutlineDesignServices color="#171717" fontSize={60} />
      ),
      "In House Wi-Fi": <BsWifi color="#171717" fontSize={60} />,
      "Digital Security": <FaDoorClosed color="#171717" fontSize={60} />,
      "Space for Open Party": <MdOutlineAir color="#171717" fontSize={60} />,
      "Roof Top": <FaSwimmingPool color="#171717" fontSize={60} />,
    };

    return (
      iconMap[title] || (
        <MdOutlineDesignServices color="#171717" fontSize={60} />
      )
    );
  };

  // Transform the API data into the format needed for rendering
  const amenities =
    amenitiesData?.map((item) => ({
      icon: getIconForTitle(item.short_title),
      title: item.short_title,
      description: item.short_desc,
      imageUrl: item.full_path, // In case you want to use the SVG images from the API instead of icons
    })) || [];

  // Group amenities into rows of 4
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const amenitiesRows = chunkArray(amenities, 4);

  return (
    <FeaturedAmenitiesStyled>
      <Container>
        <Row>
          <Col lg={12}>
            <Title
              center
              color={"#5B5B5B"}
              fontSize={"60"}
              text={"FEATURED AMENITIES"}
            />
          </Col>
        </Row>

        <div className="amenities-container">
          {amenitiesRows.map((row, rowIndex) => (
            <Row key={`row-${rowIndex}`} className="amenity-row">
              {row.map((amenity, index) => (
                <Col
                  className="p-0"
                  key={`amenity-${rowIndex}-${index}`}
                  xs={6}
                  sm={6}
                  md={3}
                  lg={3}
                >
                  <div className="amenity-card">
                    {amenity.icon}
                    <h4>{amenity.title}</h4>
                    <p>{amenity.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          ))}
        </div>
      </Container>
    </FeaturedAmenitiesStyled>
  );
}

const FeaturedAmenitiesStyled = styled.section`
  padding: 150px 0px;
  color: #5b5b5b;
  overflow: hidden;

  .amenities-container {
    margin-top: 50px;
  }

  .amenity-row {
    margin-bottom: 0;
  }

  .amenity-card {
    height: 300px;
    border: 1px solid #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: -1px;
    margin-bottom: -1px;
    padding: 20px;
    transition: 0.3s ease-in-out;

    &:hover {
      background-color: #f9f9f9;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

  @media (max-width: 768px) {
    .amenity-card {
      height: 220px;

      svg {
        font-size: 40px !important;
      }

      h4 {
        font-size: 18px;
      }

      p {
        font-size: 14px;
      }
    }
  }

  @media (max-width: 576px) {
    .amenity-card {
      height: 180px;

      svg {
        font-size: 30px !important;
      }

      h4 {
        font-size: 16px;
      }

      p {
        font-size: 12px;
      }
    }
  }
`;
