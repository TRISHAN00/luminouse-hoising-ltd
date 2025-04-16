"use client";

import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import styled from "styled-components";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    setValidated(false);
  };

  return (
    <ContactSectionStyled>
      <Container>
        <Row className="g-0">
          <Col md={6} className="contact-form-col">
            <div className="contact-form-wrapper">
              <h1>Get in Touch!</h1>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="contactName">
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name *"
                    required
                    className="form-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactEmail">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email *"
                    required
                    className="form-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactPhone">
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number *"
                    required
                    className="form-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your phone number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="contactMessage">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="form-input"
                  />
                </Form.Group>

                <Button type="submit" className="submit-btn">
                  Submit Message
                </Button>
              </Form>
            </div>
          </Col>
          <Col md={6} className="map-col">
            <div className="map-wrapper">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14609.021280753168!2d90.40715374999999!3d23.750907300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85c366afdaf%3A0x65756e120471fdb8!2sShahidbag%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1713449280000!5m2!1sen!2sus"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map"
                ></iframe>
                <div className="map-marker">
                  <FaMapMarkerAlt className="marker-icon" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </ContactSectionStyled>
  );
};

const ContactSectionStyled = styled.section`
  width: 100%;
  
  .contact-form-col {
    background-color: #121212;
    color: white;
    padding: 0;
  }
  
  .contact-form-wrapper {
    padding: 60px 40px;
    max-width: 500px;
    margin: 0 auto;
    
    @media (min-width: 768px) {
      padding: 80px 60px;
    }
  }
  
  h1 {
    font-size: 42px;
    font-weight: 600;
    margin-bottom: 40px;
    color: white;
  }
  
  .form-input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 0;
    padding: 12px 0;
    color: white;
    font-size: 16px;
    
    &:focus {
      box-shadow: none;
      background-color: transparent;
      border-color: rgba(255, 255, 255, 0.7);
      color: white;
    }
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  
  textarea.form-input {
    min-height: 100px;
  }
  
  .submit-btn {
    background-color: #007bff;
    border: none;
    border-radius: 30px;
    padding: 12px 30px;
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #0069d9;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }
  
  .map-col {
    position: relative;
    height: 100%;
    /* min-height: 400px; */
    
    @media (min-width: 768px) {
      min-height: 600px;
    }
  }
  
  .map-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .map-container {
    position: relative;
    width: 100%;
    height: 100%;
    
    iframe {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    
    .map-marker {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
      
      .marker-icon {
        color: #ff3131;
        font-size: 40px;
        filter: drop-shadow(0 2px 5px rgba(0, 0, 0, 0.3));
      }
    }
  }
`;

export default ContactSection;