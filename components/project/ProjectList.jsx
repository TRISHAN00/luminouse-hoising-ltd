"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import ProjectCard from "../ProjectCard";

import project1 from "../../public/images/dynamic/projects/project-01.jpg";
import project2 from "../../public/images/dynamic/projects/project-02.jpg";
import project3 from "../../public/images/dynamic/projects/project-03.jpg";
import Button from "../Button";

export default function ProjectList() {
  // Sample options for each filter
  const projectTypeOptions = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
  ];

  const statusOptions = [
    { value: "planning", label: "Planning" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  const locationOptions = [
    { value: "north", label: "North Region" },
    { value: "south", label: "South Region" },
    { value: "east", label: "East Region" },
    { value: "west", label: "West Region" },
  ];

  // State for each dropdown
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  // State for selected values
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Projects data matching the example image
  const projects = [
    {
      id: 1,
      title: "Luminous Jesmin Tower",
      location: "Dhanmondi, Dhaka",
      image: project1,
      detailImage: project1,
    },
    {
      id: 2,
      title: "Luminous Hamid Heights",
      location: "Oxygen More, Chittagong",
      image: project2,
      detailImage: project2,
    },
    {
      id: 3,
      title: "Luminous Harmony",
      location: "Banani, Dhaka",
      image: project3,
      detailImage: project3,
    },
    {
      id: 4,
      title: "Luminous Jesmin Tower",
      location: "Dhanmondi, Dhaka",
      image: project1,
      detailImage: project1,
    },
    // Add more projects as needed
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setIsProjectTypeOpen(false);
        setIsStatusOpen(false);
        setIsLocationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ProjectListStyled>
      <Container>
        <Row className="filters-row">
          {/* Project Type Dropdown */}
          <Col lg={4} md={4} sm={12}>
            <DropdownContainer className="dropdown-container">
              <DropdownHeader
                isOpen={isProjectTypeOpen}
                onClick={() => setIsProjectTypeOpen(!isProjectTypeOpen)}
              >
                <HeaderText isSelected={selectedProjectType}>
                  Project Type
                </HeaderText>
                <ArrowIcon isOpen={isProjectTypeOpen}>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </ArrowIcon>
              </DropdownHeader>
              {selectedProjectType && (
                <SelectedValue>{selectedProjectType.label}</SelectedValue>
              )}
              {isProjectTypeOpen && (
                <DropdownMenu>
                  {projectTypeOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      isSelected={selectedProjectType?.value === option.value}
                      onClick={() => {
                        setSelectedProjectType(option);
                        setIsProjectTypeOpen(false);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>
          </Col>

          {/* Status Dropdown */}
          <Col lg={4} md={4} sm={12}>
            <DropdownContainer className="dropdown-container">
              <DropdownHeader
                isOpen={isStatusOpen}
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                <HeaderText isSelected={selectedStatus}>Status</HeaderText>
                <ArrowIcon isOpen={isStatusOpen}>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </ArrowIcon>
              </DropdownHeader>
              {selectedStatus && (
                <SelectedValue>{selectedStatus.label}</SelectedValue>
              )}
              {isStatusOpen && (
                <DropdownMenu>
                  {statusOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      isSelected={selectedStatus?.value === option.value}
                      onClick={() => {
                        setSelectedStatus(option);
                        setIsStatusOpen(false);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>
          </Col>

          {/* Location Dropdown */}
          <Col lg={4} md={4} sm={12}>
            <DropdownContainer className="dropdown-container">
              <DropdownHeader
                isOpen={isLocationOpen}
                onClick={() => setIsLocationOpen(!isLocationOpen)}
              >
                <HeaderText isSelected={selectedLocation}>Location</HeaderText>
                <ArrowIcon isOpen={isLocationOpen}>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </ArrowIcon>
              </DropdownHeader>
              {selectedLocation && (
                <SelectedValue>{selectedLocation.label}</SelectedValue>
              )}
              {isLocationOpen && (
                <DropdownMenu>
                  {locationOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      isSelected={selectedLocation?.value === option.value}
                      onClick={() => {
                        setSelectedLocation(option);
                        setIsLocationOpen(false);
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>
          </Col>
        </Row>
        <Row className="projects-wrap">
          {projects.map((project) => (
            <Col
              className="single-project"
              key={project.id}
              lg={4}
              md={6}
              sm={12}
            >
              <ProjectCard project={project} />
            </Col>
          ))}
        </Row>
        <div className="loadMore-btn">
          <Button
            border={"1px solid #0288D1"}
            hoverBackground={"#0288D1"}
            text={"Learn More"}
          />
        </div>
      </Container>
    </ProjectListStyled>
  );
}

// Styled Components
const ProjectListStyled = styled.section`
  padding: 80px 0;
  color: #5b5b5b;

  .loadMore-btn {
    margin-top: 60px;
    display: flex;
    justify-content: center;

    @media (min-width: 767px) {
      margin-top: 40px;
    }
  }

  @media (min-width: 768px) {
    padding: 100px 0;
  }

  @media (min-width: 992px) {
    padding: 120px 0;
  }

  .filters-row {
    margin-bottom: 20px;
  }

  .projects-wrap {
    margin-top: 40px;

    @media (min-width: 768px) {
      margin-top: 50px;
    }

    @media (min-width: 992px) {
      margin-top: 60px;
    }
  }

  .single-project {
    margin-bottom: 30px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
  z-index: 10;

  &:nth-child(3) {
    z-index: 8;
  }

  &:nth-child(2) {
    z-index: 9;
  }
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => (props.isOpen ? "#171717" : "#e5e7eb")};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: #171717;
  }
`;

const HeaderText = styled.span`
  font-weight: 500;
  color: ${(props) => (props.isSelected ? "#171717" : "#5B5B5B")};
  transition: color 0.2s ease;

  ${DropdownHeader}:hover & {
    color: #171717;
  }
`;

const ArrowIcon = styled.div`
  color: ${(props) => (props.isOpen ? "#171717" : "#5B5B5B")};
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.2s ease, color 0.2s ease;
`;

const SelectedValue = styled.div`
  font-size: 14px;
  margin-top: 4px;
  color: #171717;
`;

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 10;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? "#f5f5f5" : "transparent"};
  color: ${(props) => (props.isSelected ? "#171717" : "#5B5B5B")};

  &:hover {
    background-color: #f5f5f5;
    color: #171717;
  }
`;
