"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

// Styled Components
const SectionCareer = styled.section`
    padding: 200px 0;
`

const ContainerWrap = styled(Container)`
  padding: 0;
  overflow: hidden;
`;

const ImageCol = styled(Col)`
  padding: 0;
  position: relative;
  height: 400px;

  @media (min-width: 992px) {
    height: 100%;
    min-height: 600px;
  }
`;

const FormCol = styled(Col)`
  background-color: #1a202c;
  color: white;
  padding: 3rem 2rem;

  @media (min-width: 992px) {
    padding: 4rem 3rem;
  }
`;

const StyledTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const StyledInput = styled(Form.Control)`
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid #4a5568;
  padding: 0.75rem 0;
  color: white;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    background-color: transparent;
    box-shadow: none;
    border-bottom-color: #3182ce;
    color: white;
  }
  
  /* Fix for autocomplete text color */
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px #1a202c inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  
  /* For Firefox and other browsers */
  &:autofill,
  &:autofill:hover,
  &:autofill:focus {
    -webkit-text-fill-color: white;
    -webkit-box-shadow: 0 0 0px 1000px #1a202c inset;
    caret-color: white;
    background-color: transparent !important;
  }
`;

const ResumeButton = styled.div`
  background-color: #4a5568;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d3748;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #3182ce;
  border-color: #3182ce;
  border-radius: 9999px;
  padding: 0.75rem 1.5rem;
  width: 100%;
  margin-top: 1.5rem;

  &:hover,
  &:focus,
  &:active {
    background-color: #2c5282;
    border-color: #2c5282;
  }
`;

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form or show success message
  };

  return (
    <SectionCareer>
      <ContainerWrap>
        <Row className="g-0">
          {/* Image Column */}
          <ImageCol lg={6}>
            <Image
              src="/business-person-entering-building.jpg"
              alt="Business professional entering office building"
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </ImageCol>

          {/* Form Column */}
          <FormCol lg={6}>
            <StyledTitle>Join Our Team!</StyledTitle>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <StyledInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name *"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <StyledInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <StyledInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <StyledInput
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Message"
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <ResumeButton as="label" htmlFor="resume">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginRight: "0.5rem" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  {formData.resume ? formData.resume.name : "Attach Resume"}
                </ResumeButton>
              </Form.Group>

              <SubmitButton type="submit">Submit Message</SubmitButton>
            </Form>
          </FormCol>
        </Row>
      </ContainerWrap>
    </SectionCareer>
  );
};

export default CareerForm;
