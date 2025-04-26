"use client";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import Button from "../Button";

export default function LandownerForm() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  return (
    <StyledLandownerForm>
      <Container>
        <Form>
          <Row className="form-row">
            <Col lg={6} md={12} sm={12}>
              <StyledLandFormTitle>Land Information</StyledLandFormTitle>

              <Form.Control type="text" placeholder="Location *" required />
              <Form.Control type="text" placeholder="Address *" required />
              <Form.Control
                type="text"
                placeholder="Size of the Land *"
                required
              />
              <Form.Control type="text" placeholder="Plot Facing *" required />

              <Form.Select
                aria-label="Select Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={category === "" ? "placeholder" : ""}
              >
                <option value="">Select Category</option>
                <option value="ready">Ready</option>
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
              </Form.Select>

              <Form.Select
                aria-label="Select Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={type === "" ? "placeholder" : ""}
              >
                <option value="">Select Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </Form.Select>
            </Col>
            <Col lg={6} md={12} sm={12}>
              <StyledLandFormTitle className="profile-title">Landowner Profile</StyledLandFormTitle>

              <Form.Control
                type="text"
                placeholder="Name of the Landowner *"
                required
              />

              <Form.Control
                type="text"
                placeholder="Contact Person *"
                required
              />

              <Form.Control
                type="text"
                placeholder="Contact Number *"
                required
              />

              <Form.Control type="email" placeholder="Email *" required />

              <StyledLandFormBtn className="landForm-btn">
                <Button
                  text="Submit Message"
                  background="#0288D1"
                  color="#fff"
                  iconColor="#fff"
                  hoverIconColor="#fff"
                  hoverBackground="#171717"
                />
              </StyledLandFormBtn>
            </Col>
          </Row>
        </Form>
      </Container>
    </StyledLandownerForm>
  );
}

const StyledLandownerForm = styled.section`
  padding: 150px 0;
  overflow: hidden;

  @media (max-width: 1200px) {
    padding: 120px 0;
  }

  @media (max-width: 992px) {
    padding: 100px 0;
  }

  @media (max-width: 768px) {
    padding: 80px 0;
  }

  @media (max-width: 576px) {
    padding: 60px 0;
  }

  .form-row {
    margin: 0 -15px;
  }

  form .form-control,
  form .form-select {
    width: 100%;
    border: none;
    border-bottom: 1px solid #8080805c;
    border-radius: 0;
    box-shadow: none;
    background-color: transparent;
    padding: 10px 0;
    margin-bottom: 30px;
    color: #333;
    font-size: 16px;

    @media (max-width: 768px) {
      margin-bottom: 25px;
      font-size: 15px;
    }

    @media (max-width: 576px) {
      margin-bottom: 20px;
      font-size: 14px;
    }

    &:focus {
      border-color: #8080805c;
      outline: none;
      box-shadow: none;
    }

    &::placeholder {
      color: #8080805c;
    }
  }

  /* Apply gray color when it's the default (placeholder) option */
  form .form-select.placeholder {
    color: #8080805c;
  }

  .col-lg-6 {
    padding: 0 15px;

    @media (max-width: 992px) {
      padding: 0 12px;
    }
  }

  .profile-title {
    @media (max-width: 991px) {
      margin-top: 40px;
    }

    @media (max-width: 576px) {
      margin-top: 30px;
    }
  }
`;

const StyledLandFormBtn = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    margin-top: 30px;
    justify-content: center;
  }

  @media (max-width: 576px) {
    margin-top: 25px;
  }
`;

const StyledLandFormTitle = styled.h2`
  color: #121212;
  margin-bottom: 40px;
  font-size: 28px;

  @media (max-width: 992px) {
    margin-bottom: 35px;
    font-size: 26px;
  }

  @media (max-width: 768px) {
    margin-bottom: 30px;
    font-size: 24px;
  }

  @media (max-width: 576px) {
    margin-bottom: 25px;
    font-size: 22px;
  }
`;