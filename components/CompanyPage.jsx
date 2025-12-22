// CompanyPage.jsx
import Image from 'next/image';
import {
  Card,
  Col,
  Container,
  ListGroup,
  Row
} from 'react-bootstrap';
import styled from 'styled-components';

// Styled Components
const CompanyHero = styled.div`
  padding: 3rem 0;
  background-color: #f8f9fa;
  margin-bottom: 2rem;
`;

const CompanyTitle = styled.h1`
  font-weight: 700;
  color: #212529;
  margin-bottom: 0.5rem;
`;

const CompanyDescription = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
`;

const SectionTitle = styled.h2`
  font-weight: 600;
  color: #343a40;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f8f9fa;
`;

const ServiceCard = styled(Card)`
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const TeamMemberCard = styled(Card)`
  border-radius: 10px;
  overflow: hidden;
  border: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 1rem;
    color: #0d6efd;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const BusinessHoursItem = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
`;

const CompanyPage = ({ 
  companyName,
  logo,
  description,
  mission,
  vision,
  services,
  contactInfo,
  socialMedia,
  teamMembers,
  businessHours
}) => {
  return (
    <>
      {/* Hero Section */}
      <CompanyHero>
        <Container>
          <Row className="align-items-center">
            <Col md={3} className="text-center text-md-start mb-4 mb-md-0">
              <Image 
                src={logo} 
                alt={`${companyName} logo`}
                width={180}
                height={180}
                className="img-fluid"
              />
            </Col>
            <Col md={9}>
              <CompanyTitle>{companyName}</CompanyTitle>
              <CompanyDescription>{description}</CompanyDescription>
            </Col>
          </Row>
        </Container>
      </CompanyHero>

      <Container className="mb-5">
        <Row>
          {/* Main Content */}
          <Col lg={8}>
            {/* About Section */}
            <Card className="mb-4">
              <Card.Body>
                <SectionTitle>About Us</SectionTitle>
                {mission && (
                  <div className="mb-4">
                    <h3 className="h5 fw-bold">Our Mission</h3>
                    <p>{mission}</p>
                  </div>
                )}
                
                {vision && (
                  <div>
                    <h3 className="h5 fw-bold">Our Vision</h3>
                    <p>{vision}</p>
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Services Section */}
            <Card className="mb-4">
              <Card.Body>
                <SectionTitle>Our Services</SectionTitle>
                <Row xs={1} md={2} className="g-4">
                  {services.map((service, index) => (
                    <Col key={index}>
                      <ServiceCard>
                        <Card.Body>
                          {service.icon && <div className="mb-3 text-primary">{service.icon}</div>}
                          <Card.Title>{service.title}</Card.Title>
                          <Card.Text>{service.description}</Card.Text>
                        </Card.Body>
                      </ServiceCard>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Team Section */}
            {teamMembers && teamMembers.length > 0 && (
              <Card className="mb-4">
                <Card.Body>
                  <SectionTitle>Our Team</SectionTitle>
                  <Row xs={1} sm={2} md={3} className="g-4">
                    {teamMembers.map((member, index) => (
                      <Col key={index}>
                        <TeamMemberCard>
                          <div className="position-relative" style={{ height: '200px' }}>
                            <Image 
                              src={member.image} 
                              alt={member.name} 
                              fill
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <Card.Body className="text-center">
                            <Card.Title className="h5">{member.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{member.position}</Card.Subtitle>
                            {member.bio && <Card.Text className="small">{member.bio}</Card.Text>}
                          </Card.Body>
                        </TeamMemberCard>
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            {/* Contact Information */}
            <Card className="mb-4">
              <Card.Body>
                <SectionTitle>Contact Us</SectionTitle>
                <ContactItem>
                  <i className="bi bi-envelope-fill"></i>
                  <div>
                    <small className="text-muted">Email</small>
                    <div>
                      <a href={`mailto:${contactInfo.email}`} className="text-decoration-none">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </ContactItem>
                
                <ContactItem>
                  <i className="bi bi-telephone-fill"></i>
                  <div>
                    <small className="text-muted">Phone</small>
                    <div>
                      <a href={`tel:${contactInfo.phone}`} className="text-decoration-none">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </ContactItem>
                
                <ContactItem>
                  <i className="bi bi-geo-alt-fill"></i>
                  <div>
                    <small className="text-muted">Address</small>
                    <div>{contactInfo.address}</div>
                  </div>
                </ContactItem>
                
                {contactInfo.website && (
                  <ContactItem>
                    <i className="bi bi-globe"></i>
                    <div>
                      <small className="text-muted">Website</small>
                      <div>
                        <a 
                          href={contactInfo.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none"
                        >
                          {contactInfo.website}
                        </a>
                      </div>
                    </div>
                  </ContactItem>
                )}
              </Card.Body>
            </Card>

            {/* Social Media */}
            {socialMedia && Object.values(socialMedia).some(value => value) && (
              <Card className="mb-4">
                <Card.Body>
                  <SectionTitle>Follow Us</SectionTitle>
                  <SocialLinks>
                    {socialMedia.facebook && (
                      <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <i className="bi bi-facebook fs-4"></i>
                      </a>
                    )}
                    {socialMedia.instagram && (
                      <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <i className="bi bi-instagram fs-4"></i>
                      </a>
                    )}
                    {socialMedia.linkedin && (
                      <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <i className="bi bi-linkedin fs-4"></i>
                      </a>
                    )}
                    {socialMedia.twitter && (
                      <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <i className="bi bi-twitter fs-4"></i>
                      </a>
                    )}
                  </SocialLinks>
                </Card.Body>
              </Card>
            )}

            {/* Business Hours */}
            {businessHours && businessHours.length > 0 && (
              <Card>
                <Card.Body>
                  <SectionTitle>Business Hours</SectionTitle>
                  <ListGroup variant="flush">
                    {businessHours.map((item, index) => (
                      <BusinessHoursItem key={index}>
                        <span>{item.days}</span>
                        <span>{item.hours}</span>
                      </BusinessHoursItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CompanyPage;