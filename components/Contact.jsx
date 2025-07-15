"use client";

import { useState } from "react";
import { Col, Container } from "react-bootstrap";
import { FiArrowRight, FiSend } from "react-icons/fi";
import styled from "styled-components";
import Button from "./Button";
import Title from "./Title";

export default function CallbackRequestForm({ data }) {
  const arrow = <FiArrowRight color="#fff" />;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Form submitted:", formData);
  };

  return (
    <FormContainer>
      <Container>
        <Col lg={12}>
          <div className="contact-title">
            <Title
              color={"#FFF"}
              fontSize={"60"}
              text={data?.section_data?.subtitle}
            />
          </div>
        </Col>
        <Col lg={{ offset: 2, span: 8 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <StyledInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <InputLabel htmlFor="name">Name*</InputLabel>
              <InputLine className={formData.name ? "active" : ""} />
            </FormGroup>

            <FormGroup>
              <StyledInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <InputLabel htmlFor="email">Email*</InputLabel>
              <InputLine className={formData.email ? "active" : ""} />
            </FormGroup>

            <FormGroup>
              <StyledInput
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <InputLabel htmlFor="phone">Phone*</InputLabel>
              <InputLine className={formData.phone ? "active" : ""} />
            </FormGroup>

            <FormGroup>
              <StyledTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder=" "
              />
              <TextareaLabel htmlFor="message">Message</TextareaLabel>
              <InputLine className={formData.message ? "active" : ""} />
            </FormGroup>
            <div className="contact-btn">
              <Button
                text="Send Message"
                background="#0288D1"
                hoverBackground="#0288D1"
                border="1px solid #0288D1"
                hoverBorderColor="#0288D1"
                color="#fff"
                hoverColor="#fff"
                icon={<FiSend size={16} />}
              />
            </div>
          </Form>
        </Col>
      </Container>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  background-color: #171717;
  color: #ffffff;
  padding: 120px 0;
  width: 100%;

  .contact-btn {
    padding-top: 60px;
    margin: 0 auto;
  }

  .contact-title {
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
  }
`;

const FormHeading = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-align: center;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
    margin-bottom: 4rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
`;

const FormGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  position: absolute;
  left: 0;
  top: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
`;

const TextareaLabel = styled(InputLabel)`
  top: 10px;
`;

const InputLine = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 1px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: #ffffff;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &.active::after,
  input:focus ~ &::after,
  textarea:focus ~ &::after {
    transform: scaleX(1);
  }
`;

const StyledInput = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  color: #ffffff;
  font-size: 1rem;
  padding: 10px 0;
  outline: none;

  &:focus ~ ${InputLabel}, &:not(:placeholder-shown) ~ ${InputLabel} {
    transform: translateY(-20px);
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.9);
  }

  &:focus + ${InputLine}::after {
    transform: scaleX(1);
  }

  /* Handle browser autofill styling */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: #ffffff;
    -webkit-box-shadow: 0 0 0px 1000px #171717 inset;
    transition: background-color 5000s ease-in-out 0s;
    caret-color: white;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  background-color: transparent;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  padding: 10px 0;
  outline: none;
  resize: vertical;
  min-height: 100px;

  &:focus ~ ${TextareaLabel}, &:not(:placeholder-shown) ~ ${TextareaLabel} {
    transform: translateY(-20px);
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.9);
  }

  &:focus + ${InputLine}::after {
    transform: scaleX(1);
  }

  /* Handle browser autofill styling */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: #ffffff;
    -webkit-box-shadow: 0 0 0px 1000px #171717 inset;
    transition: background-color 5000s ease-in-out 0s;
    caret-color: white;
  }
`;

const SubmitButton = styled.button`
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #ffffff;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  margin-top: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  @media (min-width: 768px) {
    padding: 1rem 2.5rem;
  }
`;
