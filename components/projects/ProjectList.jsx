'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Select, { components } from 'react-select';
import styled from 'styled-components';
import ProjectSingle from './ProjectSingle';

const ProjectList = ({
  data,
  setSelectedStatus,
  setSelectedType,
  setSelectedLocation,
  location,
  selectedStatus,
  selectedType,
  selectedLocation,
}) => {
  const searchParams = useSearchParams();
  
  const [visibleItems, setVisibleItems] = useState(12);
  const [hideProject, setHideProject] = useState(false);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 9);
  };

  // dropdown style
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderRadius: 0,
      color: state.isSelected ? '#FFF' : 'rgba(0,0,0,0.5)',
      backgroundColor: state.isSelected ? '#00A651' : '#]212158',
      margin: 0,
      cursor: 'pointer',
    }),
    menu: (provided, state) => ({
      ...provided,
      color: 'rgba(0,0,0,0.5)',
      backgroundColor: state.isSelected ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)',
      margin: 0,
    }),
    menuList: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#000' : '#FFF',
      borderRadius: 0,
      cursor: 'pointer',
    }),
  };

  // drop down indicator
  const DropdownIndicator = (props) => {
    return (
      components.DropdownIndicator && (
        <components.DropdownIndicator {...props}>
          {props.selectProps.menuIsOpen ? (
            <Image src="/images/static/caret-up.svg" alt="Up arrow" width={12} height={12} />
          ) : (
            <Image src="/images/static/caret-down.svg" alt="Down arrow" width={12} height={12} />
          )}
        </components.DropdownIndicator>
      )
    );
  };

  // options
  const status = [
    { value: 'ready', label: 'Ready' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' },
  ];
  
  const type = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'condominium ', label: 'Condominium ' },
  ];

  // hide completed projects
  useEffect(() => {
    const currentStatus = searchParams.get('status');
    if (currentStatus === 'completed') {
      setHideProject(false);
    } else {
      setHideProject(true);
    }
  }, [searchParams]);

  return (
    <StyledComponent className={'projects-list'}>
      <Container>
        <Row className={'projects-list__filter'}>
          <Col md={4} sm={6}>
            <p>Status</p>
            <Select
              components={{ DropdownIndicator }}
              styles={customStyles}
              classNamePrefix={'custom'}
              className="select-here"
              placeholder={selectedStatus || 'Project Status'}
              options={status}
              value={selectedStatus ? status.find(option => option.value === selectedStatus) : null}
              onChange={(selectedOption) => setSelectedStatus(selectedOption.value)}
            />
          </Col>
          <Col md={4} sm={6}>
            <p>Type</p>
            <Select
              components={{ DropdownIndicator }}
              styles={customStyles}
              classNamePrefix={'custom'}
              className="select-here"
              placeholder={selectedType || 'Project Type'}
              options={type}
              value={selectedType ? type.find(option => option.value === selectedType) : null}
              onChange={(selectedOption) => setSelectedType(selectedOption.value)}
            />
          </Col>
          <Col md={4} sm={6}>
            <p>Location</p>
            <Select
              components={{ DropdownIndicator }}
              styles={customStyles}
              classNamePrefix={'custom'}
              className="select-here"
              placeholder={selectedLocation || 'Project Location'}
              options={location}
              value={selectedLocation ? location.find(option => option.value === selectedLocation) : null}
              onChange={(selectedOption) => setSelectedLocation(selectedOption.value)}
            />
          </Col>
        </Row>
      </Container>

      <div className="project-list__wrap">
        <Container>
          <Row>
            {data?.slice(0, visibleItems).map((item, index) => {
              const thumb = item?.images?.list.find((f) => f?.thumb === 'on');
              return (
                <Col
                  key={index}
                  className={
                    hideProject &&
                    (item?.product_data?.identifier === 'tropical-cantt-view-2' ||
                      item?.product_data?.identifier === 'shams-tropical-paradise1' ||
                      item?.product_data?.identifier === 'tropical-rampura-heights' ||
                      item?.product_data?.category_id === 'completed')
                      ? 'no-need'
                      : 'project-show'
                  }
                  md={4}
                  sm={6}
                >
                  <ProjectSingle
                    soldout={item?.product_data?.soldout}
                    ready={item?.product_data?.ready}
                    showDetail={item?.product_data?.showdetails}
                    catId={item?.product_data?.category_id}
                    slug={item?.product_data?.slug}
                    address={item?.product_data?.location}
                    title={item?.product_data?.title}
                    img={thumb?.full_path ? thumb?.full_path : '/images/dynamic/project1.jpg'}
                  />
                </Col>
              );
            })}
          </Row>
          
          {data && visibleItems < data.length && (
            <div className="load-more text-center">
              <button className="btn btn-primary" onClick={handleLoadMore}>
                Load More
              </button>
            </div>
          )}
        </Container>
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.section`
  padding-top: 60px;
  padding-bottom: 150px;
  background-color: #1D3130;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  //load more button
  .load-more {
    padding-top: 60px;
  }

  .project-list__filter {
    padding-bottom: 40px;

    p {
      font-size: 12px;
      line-height: 18px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 10px;
    }
  }

  //caret
  .custom__control {
    background-color: transparent;
    border: 1px solid #D0DEDE !important;
    box-shadow: none;
    outline: none !important;
    cursor: pointer;
    margin-bottom: 20px;
    border-radius: 50px!important;
    height: 50px;
    padding: 0 30px;

    svg line {
      stroke: #FFF
    }

    .custom__single-value {
      color: #FFF;
      font-size: 15px;
      line-height: 20px;
    }

    .custom__placeholder {
      text-transform: capitalize;
      color: #FFF;
      font-size: 16px;
      line-height: 24px;
    }

    .custom__value-container {
      padding-left: 0;
    }

    &--is-focused {

    }
  }

  .custom__menu {
    z-index: 9;
  }

  .css-t3ipsp-control:hover {
    border-color: rgba(255, 255, 255, 0.46);
  }

  .custom__indicator-separator {
    display: none;
  }

  .custom__indicator {
    padding-right: 0;
  }

  .project-list__wrap {
    padding-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    min-height: 70vh;

    .col-sm-6 {
      margin-bottom: 40px;
    }
  }

  @media (min-width: 768px) {
    //load more button
    .load-more {
      padding-top: 40px;
    }
  }
`;

export default ProjectList;