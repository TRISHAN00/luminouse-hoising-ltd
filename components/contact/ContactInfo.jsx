"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";

// Styled components
const ContactWrapper = styled.div`
  padding-top: 100px;
  overflow: hidden;
  width: 100%;
`;

const ContactContainer = styled.div`
  border-radius: 0.25rem;
  overflow: hidden;
`;

const ContactSection = styled(Col)`
  padding: 1.5rem;

  @media (min-width: 768px) {
    ${(props) =>
      props.middle &&
      `
      border-left: 1px solid #e5e5e5;
      border-right: 1px solid #e5e5e5;
    `}
  }

  @media (max-width: 767px) {
    border-bottom: ${(props) => (props.last ? "none" : "1px solid #e5e5e5")};
  }
`;

const SectionTitle = styled.h3`
  color: #777;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const SectionContent = styled.p`
  color: #333;
  margin-bottom: 0;
`;

const StyledLink = styled.a`
  color: #333;
  text-decoration: none;

  &:hover {
    color: #0056b3;
    transition: color 0.2s ease;
  }
`;

const ContactInfo = ({ data }) => {
  const allInfo = data?.posts?.list;
  const address = allInfo?.find((f) => f?.data?.slug === "address");
  const email = allInfo?.find((f) => f?.data?.slug === "email");
  const phone = allInfo?.find((f) => f?.data?.slug === "phone");

  return (
    <ContactWrapper>
      <Container>
        <ContactContainer>
          <Row className="m-0">
            {address && (
              <ContactSection xs={12} md={4}>
                <SectionTitle>{address?.data?.title}:</SectionTitle>
                <SectionContent>{address?.data?.description}</SectionContent>
              </ContactSection>
            )}

            {email && (
              <ContactSection xs={12} md={4} middle>
                <SectionTitle>{email?.data?.title}:</SectionTitle>
                <SectionContent>
                  <StyledLink href={`mailto:${email?.data?.description}`}>
                    {email?.data?.description}
                  </StyledLink>
                </SectionContent>
              </ContactSection>
            )}
            {phone && (
              <ContactSection xs={12} md={4} last>
                <SectionTitle>{email?.data?.title}:</SectionTitle>
                <SectionContent>{phone?.data?.description}</SectionContent>
              </ContactSection>
            )}
          </Row>
        </ContactContainer>
      </Container>
    </ContactWrapper>
  );
};

export default ContactInfo;
