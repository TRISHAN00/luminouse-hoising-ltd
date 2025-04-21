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
          <Row>
            <Col lg={6}>
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
            <Col lg={6}>
              <StyledLandFormTitle>Landowner Profile</StyledLandFormTitle>

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
                  text="Learn More"
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
`;

const StyledLandFormBtn = styled.div`
    margin-top: 40px;
`

const StyledLandFormTitle = styled.h2`
  color: #121212;
  margin-bottom: 40px;
`;
