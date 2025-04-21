"use client";
import { Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";

export default function LandownerForm() {
  return (
    <StyledLandownerForm>
      <Container>
        <Form>
          <Row>
            <Col lg={6}>
              <Form.Control type="text" placeholder="Location *" required />
              <Form.Control type="text" placeholder="Address *" required />
              <Form.Control
                type="text"
                placeholder="Size of the Land *"
                required
              />
              <Form.Control type="text" placeholder="Plot Facing *" required />
              <Form.Select aria-label="Select Category">
                <option>Select Category</option>
                <option value="ready">Ready</option>
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
              </Form.Select>
              <Form.Select aria-label="Select Type">
                <option>Select Type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Idustrial</option>
              </Form.Select>
            </Col>
            <Col lg={6}>
              <h2>Right</h2>
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
    color: #80808094;
    padding: 10px 0;
    margin-bottom: 20px;

    &:focus {
      border-color: #8080805c;
      outline: none;
      box-shadow: none;
    }

    &::placeholder {
      color: #8080805c;
    }
  }
`;


