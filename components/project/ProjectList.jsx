"use client";

import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import ProjectCard from "../ProjectCard";

export default function ProjectList({ data }) {
  const [isProjectTypeOpen, setIsProjectTypeOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [visibleCount, setVisibleCount] = useState(10); // Show 10 initially

  const projectsRaw = data?.data || [];

  // Extract dynamic filter options with "All" option
  const projectTypeOptions = [
    { value: null, label: "All" },
    ...Array.from(
      new Set(projectsRaw.map((p) => p.product_data?.type).filter(Boolean))
    ).map((type) => ({ value: type, label: capitalize(type) })),
  ];

  const statusOptions = [
    { value: null, label: "All" },
    ...Array.from(
      new Set(projectsRaw.map((p) => p.product_data?.status).filter(Boolean))
    ).map((status) => ({ value: status, label: capitalize(status) })),
  ];

  const locationOptions = [
    { value: null, label: "All" },
    ...Array.from(
      new Set(projectsRaw.map((p) => p.product_data?.location).filter(Boolean))
    ).map((location) => ({ value: location, label: location })),
  ];

  // Filter projects
  const projects = projectsRaw.filter((project) => {
    const pd = project.product_data;
    return (
      (!selectedProjectType ||
        selectedProjectType.value === null ||
        pd?.type === selectedProjectType.value) &&
      (!selectedStatus ||
        selectedStatus.value === null ||
        pd?.status === selectedStatus.value) &&
      (!selectedLocation ||
        selectedLocation.value === null ||
        pd?.location === selectedLocation.value)
    );
  });

  const visibleProjects = projects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

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

  if (!data) return <LoadingSpinner />;

  return (
    <ProjectListStyled>
      <Container>
        <Row className="filters-row">
          {/* Project Type */}
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
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
                      key={option.value || "all"}
                      isSelected={selectedProjectType?.value === option.value}
                      onClick={() => {
                        setSelectedProjectType(option);
                        setIsProjectTypeOpen(false);
                        setVisibleCount(10); // Reset load count
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>
          </Col>

          {/* Status */}
          <Col lg={4} md={4} sm={12}>
            <DropdownContainer className="dropdown-container">
              <DropdownHeader
                isOpen={isStatusOpen}
                onClick={() => setIsStatusOpen(!isStatusOpen)}
              >
                <HeaderText isSelected={selectedStatus}>Status</HeaderText>
                <ArrowIcon isOpen={isStatusOpen}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
                      key={option.value || "all"}
                      isSelected={selectedStatus?.value === option.value}
                      onClick={() => {
                        setSelectedStatus(option);
                        setIsStatusOpen(false);
                        setVisibleCount(10); // Reset load count
                      }}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              )}
            </DropdownContainer>
          </Col>

          {/* Location */}
          <Col lg={4} md={4} sm={12}>
            <DropdownContainer className="dropdown-container">
              <DropdownHeader
                isOpen={isLocationOpen}
                onClick={() => setIsLocationOpen(!isLocationOpen)}
              >
                <HeaderText isSelected={selectedLocation}>Location</HeaderText>
                <ArrowIcon isOpen={isLocationOpen}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
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
                      key={option.value || "all"}
                      isSelected={selectedLocation?.value === option.value}
                      onClick={() => {
                        setSelectedLocation(option);
                        setIsLocationOpen(false);
                        setVisibleCount(10); // Reset load count
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
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project) => (
              <Col key={project.id} lg={4} md={6} sm={12} className="single-project">
                <ProjectCard project={project} />
              </Col>
            ))
          ) : (
            <Col>
              <p>No projects found matching your filters.</p>
            </Col>
          )}
        </Row>

        {visibleCount < projects.length && (
          <div className="loadMore-btn">
            <Button
              onClick={handleLoadMore}
              border="1px solid #0288D1"
              hoverBackground="#0288D1"
              text="Load More"
            />
          </div>
        )}
      </Container>
    </ProjectListStyled>
  );
}

// Helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Styled Components (same as before)
const ProjectListStyled = styled.section`
  padding: 80px 0;
  color: #5b5b5b;
  overflow: hidden;

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
