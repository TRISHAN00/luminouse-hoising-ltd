"use client";
import { Img } from "@/components/Img";
import Line from "@/components/Lines";
import { white } from "@/styles/globalStyleVars";
import { Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import chairman from "../../public/images/dynamic/about/chairman.jpg";

export default function BOD({ boardMembers }) {
  // If no boardMembers prop is provided, use this example data
  const members = boardMembers || [
    {
      id: 1,
      name: "Lutfor Rahman",
      position: "Chairman of Luminous Housing",
      image: chairman,
      bio: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, cupiditate earum. Quibusdam porro error veritatis culpa harum placeat repellat minima nostrum! Optio, qui nostrum dolor quibusdam laudantium facilis est eaque dignissimos magni iure pariatur minima reiciendis accusantium obcaecati, vitae, fugiat quas nisi reprehenderit mollitia quo ipsum neque odio alias ipsam? Consequuntur adipisci tempora veritatis magni rerum quia debitis! Distinctio, sapiente placeat eum voluptates excepturi, error doloribus assumenda dolorem, recusandae dolore facere unde quibusdam vero maiores labore reprehenderit maxime? Consectetur nisi perspiciatis obcaecati ipsa? Harum aut, rerum tempore veniam doloribus aperiam fuga, illum quaerat alias voluptate pariatur eaque eos dolore modi!",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae reprehenderit debitis deserunt explicabo perferendis accusamus quos asperiores optio consequatur, enim nisi et itaque doloribus sed temporibus nobis exercitationem suscipit placeat."
      ]
    },
    {
      id: 2,
      name: "Sarah Johnson",
      position: "Managing Director",
      image: chairman,
      bio: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, cupiditate earum. Quibusdam porro error veritatis culpa harum placeat repellat minima nostrum! Optio, qui nostrum dolor quibusdam laudantium facilis est eaque dignissimos magni iure pariatur minima reiciendis accusantium obcaecati, vitae, fugiat quas nisi reprehenderit mollitia quo ipsum neque odio alias ipsam?",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae reprehenderit debitis deserunt explicabo perferendis accusamus quos asperiores optio consequatur, enim nisi et itaque doloribus sed temporibus nobis exercitationem suscipit placeat."
      ]
    },
    {
      id: 3,
      name: "Akram Khan",
      position: "Chief Operating Officer",
      image: chairman,
      bio: [
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, cupiditate earum. Quibusdam porro error veritatis culpa harum placeat repellat minima nostrum! Optio, qui nostrum dolor quibusdam laudantium facilis est eaque dignissimos magni iure pariatur minima reiciendis accusantium obcaecati.",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae reprehenderit debitis deserunt explicabo perferendis accusamus quos asperiores optio consequatur."
      ]
    }
  ];

  return (
    <BODStyled>
      <Line />
      <Container>
        {members.map((member, index) => (
          <Row className={`single-bod ${index % 2 !== 0 ? 'even' : ''}`} key={member.id}>
            {index % 2 === 0 ? (
              // Odd rows (index is even since array is 0-indexed)
              <>
                <Col lg={4} md={5} sm={12}>
                  <div className="bod-wrap">
                    <div className="bod-img">
                      <Img src={member.image} alt={member.name} />
                    </div>
                  </div>
                </Col>
                <Col lg={{offset: 1, span: 7}} md={7} sm={12}>
                  <div className="bod-text">
                    <div className="bod-text__top">
                      <h4>{member.name}</h4>
                      <h5>{member.position}</h5>
                    </div>
                    <div className="bod-text__bottom">
                      {member.bio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              // Even rows (index is odd since array is 0-indexed)
              <>
                <Col lg={7} md={7} sm={12} className="bod-text-col">
                  <div className="bod-text">
                    <div className="bod-text__top">
                      <h4>{member.name}</h4>
                      <h5>{member.position}</h5>
                    </div>
                    <div className="bod-text__bottom">
                      {member.bio.map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </Col>
                <Col lg={{offset: 1, span: 4}} md={5} sm={12} className="bod-img-col">
                  <div className="bod-wrap">
                    <div className="bod-img">
                      <Img src={member.image} alt={member.name} />
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>
        ))}
      </Container>
    </BODStyled>
  );
}

const BODStyled = styled.section`
  padding: 200px 0;
  position: relative;
  background-color: #171717;
  overflow: hidden;

  .bod-img {
    padding-top: calc(480 / 400 * 100%);
    position: relative;
    margin-bottom: 30px;
  }

  .single-bod {
    margin-bottom: 150px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.even {
      .bod-text {
        
        @media (max-width: 991px) {
          text-align: left;
        }
      }
    }
  }

  .bod-text {
    &__top {
      margin-bottom: 40px;
      h4 {
        color: ${white};
        font-weight: 600;
        margin-bottom: 15px;
      }
      h5 {
        color: #C4C4C4;
      }
    }

    &__bottom {
      p {
        color: #C4C4C4;
        margin-bottom: 30px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  /* Responsive styles */
  @media (max-width: 991px) {
    padding: 80px 0;
    
    .single-bod {
      margin-bottom: 100px;
    }
    
    .bod-text {
      margin-top: 30px;
    }
    
    /* Reset the order for mobile */
    .even {
      .bod-text-col {
        order: 2;
      }
      .bod-img-col {
        order: 1;
      }
    }
  }

  @media (max-width: 767px) {
    padding: 60px 0;
    
    .single-bod {
      margin-bottom: 70px;
    }
    
    .bod-text {
      &__top {
        margin-bottom: 25px;
      }
    }
  }

  @media (max-width: 575px) {
    padding: 40px 0;
    
    .single-bod {
      margin-bottom: 50px;
    }
    
    .bod-img {
      padding-top: calc(300 / 400 * 100%); /* Adjusted aspect ratio for smaller screens */
    }
  }
`;