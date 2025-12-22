"use client";
import styled from "styled-components";
import { Img } from "../Img";

export default function TeamCard({ name = "Team Member", position = "Position", image }) {
  return (
    <TeamCardStyled>
      <div className="team-image">
        <Img src={image} alt={name} />
      </div>
      <div className="team-content">
        <h4>{name}</h4>
        <p>{position}</p>
      </div>
    </TeamCardStyled>
  );
}

const TeamCardStyled = styled.div`
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    
    .team-content {
      background-color: #f8f8f8;
    }
  }

  .team-image {
    position: relative;
    padding-top: calc(370 / 370 * 100%);
    overflow: hidden;
    
    img {
      transition: transform 0.4s ease;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }

  .team-content {
    padding: 20px;
    background-color: #fff;
    transition: all 0.3s ease;
    
    h4 {
      font-size: 22px;
      margin-bottom: 10px;
      font-weight: 600;
      color: #171717;
    }
    
    p {
      font-size: 16px;
      color: #777;
      margin: 0;
    }
  }
  
  @media (max-width: 1199px) {
    .team-content {
      h4 {
        font-size: 20px;
      }
      
      p {
        font-size: 15px;
      }
    }
  }
  
  @media (max-width: 991px) {
    .team-content {
      padding: 15px;
      
      h4 {
        font-size: 18px;
        margin-bottom: 8px;
      }
      
      p {
        font-size: 14px;
      }
    }
  }
  
  @media (max-width: 767px) {
    margin-bottom: 15px;
    
    .team-image {
      padding-top: calc(350 / 350 * 100%);
    }
  }
  
  @media (max-width: 575px) {
    .team-content {
      padding: 12px;
      
      h4 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      
      p {
        font-size: 13px;
      }
    }
  }
`;