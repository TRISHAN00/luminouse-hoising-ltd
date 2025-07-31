"use client";
import { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import styled from "styled-components";
import Button from "../Button";

export default function LandownerForm() {
  const [formData, setFormData] = useState({
    location: "",
    address: "",
    sol: "",
    pf: "",
    nol: "",
    cp: "",
    cn: "",
    email: "",
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }
    payload.append("form_id", "lp-form");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/post-req-data/form-submit`,
        {
          method: "POST",
          body: payload,
        }
      );

      setLoading(false);

      if (!res.ok) throw new Error("Form submission failed");

      toast.success("Your message has been sent!");

      setFormData({
        location: "",
        address: "",
        sol: "",
        pf: "",
        nol: "",
        cp: "",
        cn: "",
        email: "",
      });
      setValidated(false);
    } catch (err) {
      console.error(err);
      toast.error("There was an error. Please try again.");
    }
  };

  return (
    <StyledLandownerForm>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="form-row">
            <Col lg={6} md={12} sm={12}>
              <StyledLandFormTitle>Land Information</StyledLandFormTitle>

              <Form.Control
                name="location"
                type="text"
                placeholder="Location *"
                required
                value={formData.location}
                onChange={handleChange}
              />
              <Form.Control
                name="address"
                type="text"
                placeholder="Address *"
                required
                value={formData.address}
                onChange={handleChange}
              />
              <Form.Control
                type="text"
                name="sol"
                placeholder="Size of the Land *"
                required
                value={formData.sol}
                onChange={handleChange}
              />
              <Form.Control
                name="pf"
                type="text"
                placeholder="Plot Facing *"
                required
                value={formData.pf}
                onChange={handleChange}
              />
            </Col>
            <Col lg={6} md={12} sm={12}>
              <StyledLandFormTitle className="profile-title">
                Landowner Profile
              </StyledLandFormTitle>

              <Form.Control
                name="nol"
                type="text"
                placeholder="Name of the Landowner *"
                required
                value={formData.nol}
                onChange={handleChange}
              />

              <Form.Control
                name="cp"
                type="text"
                placeholder="Contact Person *"
                required
                value={formData.cp}
                onChange={handleChange}
              />

              <Form.Control
                name="cn"
                type="text"
                placeholder="Contact Number *"
                required
                value={formData.cn}
                onChange={handleChange}
              />

              <Form.Control
                name="email"
                type="email"
                placeholder="Email *"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <StyledLandFormBtn className="landForm-btn">
                <Button
                  type="submit"
                  text="Submit Message"
                  background="#0288D1"
                  color="#fff"
                  iconColor="#fff"
                  hoverIconColor="#fff"
                  hoverBackground="#171717"
                  loading={loading}
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
