"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import Button from "../Button";
import LoadingSpinner from "../LoadingSpinner";
import ProjectCard from "../ProjectCard";

export default function ProjectList({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedProjectType, setSelectedProjectType] = useState({
    label: "Project Type",
    value: null,
  });
  const [selectedStatus, setSelectedStatus] = useState({
    label: "Status",
    value: null,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    label: "Location",
    value: null,
  });

  const [visibleCount, setVisibleCount] = useState(10);

  const projectsRaw = data?.data || [];

  // Options
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
    ).map((loc) => ({ value: loc, label: loc })),
  ];

  // Sync state with URL query
  useEffect(() => {
    const typeParam = searchParams.get("type");
    const statusParam = searchParams.get("status");
    const locationParam = searchParams.get("location");

    const typeOption = projectTypeOptions.find(
      (opt) => opt.value === typeParam
    ) || { value: null, label: "Project Type" };
    const statusOption = statusOptions.find(
      (opt) => opt.value === statusParam
    ) || { value: null, label: "Status" };
    const locationOption = locationOptions.find(
      (opt) => opt.value === locationParam
    ) || { value: null, label: "Location" };

    setSelectedProjectType(typeOption);
    setSelectedStatus(statusOption);
    setSelectedLocation(locationOption);
  }, [searchParams, data]);

  // Filter logic
  const projects = projectsRaw.filter((project) => {
    const pd = project.product_data;
    return (
      (!selectedProjectType.value || pd?.type === selectedProjectType.value) &&
      (!selectedStatus.value || pd?.status === selectedStatus.value) &&
      (!selectedLocation.value || pd?.location === selectedLocation.value)
    );
  });

  const visibleProjects = projects.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleOptionSelect = (type, option) => {
    const params = new URLSearchParams(searchParams.toString());

    if (type === "projectType") {
      setSelectedProjectType(option);
      option.value ? params.set("type", option.value) : params.delete("type");
    } else if (type === "status") {
      setSelectedStatus(option);
      option.value
        ? params.set("status", option.value)
        : params.delete("status");
    } else if (type === "location") {
      setSelectedLocation(option);
      option.value
        ? params.set("location", option.value)
        : params.delete("location");
    }

    setOpenDropdown(null);
    setVisibleCount(10);
    router.push(`?${params.toString()}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {!data && <LoadingSpinner />}
      <ProjectListStyled>
        <Container>
          <Row className="filters-row">
            <Col lg={4} md={4} sm={12}>
              <DropdownContainer className="dropdown-container">
                <DropdownHeader
                  isOpen={openDropdown === "projectType"}
                  onClick={() => handleDropdownToggle("projectType")}
                >
                  <HeaderText isSelected={!!selectedProjectType?.value}>
                    {selectedProjectType?.label || "Project Type"}
                  </HeaderText>
                  <ArrowIcon isOpen={openDropdown === "projectType"}>
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
                      />
                    </svg>
                  </ArrowIcon>
                </DropdownHeader>

                <DropdownMenu
                  className={openDropdown === "projectType" ? "open" : ""}
                >
                  {projectTypeOptions.map((option) => (
                    <MenuItem
                      key={option.value || "all"}
                      isSelected={selectedProjectType?.value === option.value}
                      onClick={() => handleOptionSelect("projectType", option)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              </DropdownContainer>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <DropdownContainer className="dropdown-container">
                <DropdownHeader
                  isOpen={openDropdown === "status"}
                  onClick={() => handleDropdownToggle("status")}
                >
                  <HeaderText isSelected={!!selectedStatus?.value}>
                    {selectedStatus?.label || "Status"}
                  </HeaderText>
                  <ArrowIcon isOpen={openDropdown === "status"}>
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
                      />
                    </svg>
                  </ArrowIcon>
                </DropdownHeader>

                <DropdownMenu
                  className={openDropdown === "status" ? "open" : ""}
                >
                  {statusOptions.map((option) => (
                    <MenuItem
                      key={option.value || "all"}
                      isSelected={selectedStatus?.value === option.value}
                      onClick={() => handleOptionSelect("status", option)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              </DropdownContainer>
            </Col>

            <Col lg={4} md={4} sm={12}>
              <DropdownContainer className="dropdown-container">
                <DropdownHeader
                  isOpen={openDropdown === "location"}
                  onClick={() => handleDropdownToggle("location")}
                >
                  <HeaderText isSelected={!!selectedLocation?.value}>
                    {selectedLocation?.label || "Location"}
                  </HeaderText>
                  <ArrowIcon isOpen={openDropdown === "location"}>
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
                      />
                    </svg>
                  </ArrowIcon>
                </DropdownHeader>

                <DropdownMenu
                  className={openDropdown === "location" ? "open" : ""}
                >
                  {locationOptions.map((option) => (
                    <MenuItem
                      key={option.value || "all"}
                      isSelected={selectedLocation?.value === option.value}
                      onClick={() => handleOptionSelect("location", option)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </DropdownMenu>
              </DropdownContainer>
            </Col>
          </Row>

          <Row className="projects-wrap">
            {visibleProjects.length > 0 ? (
              visibleProjects.map((project) => (
                <Col
                  key={project.id}
                  lg={4}
                  md={6}
                  sm={12}
                  className="single-project"
                >
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
    </>
  );
}

// Helper
function capitalize(str) {
  const s = typeof str === "string" ? str : String(str || "");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Styled Components
const ProjectListStyled = styled.section`
  padding: 80px 0;
  color: #5b5b5b;

  .loadMore-btn {
    margin-top: 60px;
    display: flex;
    justify-content: center;
  }

  .filters-row {
    margin-bottom: 20px;
  }

  .projects-wrap {
    margin-top: 40px;
  }

  .single-project {
    margin-bottom: 30px;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 1px solid ${(props) => (props.isOpen ? "#171717" : "#e5e7eb")};
`;

const HeaderText = styled.span`
  font-weight: 500;
  color: ${(props) => (props.isSelected ? "#171717" : "#5B5B5B")};
`;

const ArrowIcon = styled.div`
  color: ${(props) => (props.isOpen ? "#171717" : "#5B5B5B")};
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
`;

const DropdownMenu = styled.div`
  position: absolute;
  z-index: 1000;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-10px);
  transition: all 0.3s ease;

  &.open {
    max-height: 500px;
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
`;

const MenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  background-color: ${(props) =>
    props.isSelected ? "#f5f5f5" : "transparent"};
  color: ${(props) => (props.isSelected ? "#171717" : "#5B5B5B")};
  &:hover {
    background-color: #f5f5f5;
    color: #171717;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;
