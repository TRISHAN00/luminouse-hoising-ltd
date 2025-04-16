'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const ProjectSingle = ({
  soldout,
  ready,
  catId,
  slug,
  address,
  title,
  img,
  showDetail,
}) => {
  return (
    <StyledComponent className={'project-list__single'}>
      <div className="list-thumb">
        {/* Image with proper next/image usage */}
        <Image 
          src={img} 
          alt={title || 'Project image'} 
          width={500} 
          height={350} 
          style={{ objectFit: 'cover' }}
          priority={false}
        />
        
        {catId === 'ongoing' && (
          <div className="thumb-status">
            <span>Ongoing</span>
          </div>
        )}
        {catId === 'upcoming' && (
          <div className="thumb-status">
            <span>Upcoming</span>
          </div>
        )}
        {catId === 'completed' && (
          <div className="thumb-status">
            <span>Completed</span>
          </div>
        )}
        {ready === 'on' && (
          <div className="thumb-status">
            <span>Ready</span>
          </div>
        )}
        {soldout === 'on' && (
          <div className="thumb-soldout">
            <span>Sold Out</span>
          </div>
        )}
      </div>
      <div className="list-info">
        <span className="list-address">{address}</span>
        <h4 className="list-title">{title}</h4>
        
        {/* Fix for <Link> with <a> child issue */}
        {showDetail === 'on' ? (
          <Link 
            href={`/project/${slug}`} 
            className="list-btn"
          >
            View Details
          </Link>
        ) : (
          <span className="list-btn disabled">
            View Details
          </span>
        )}
      </div>
    </StyledComponent>
  );
};

const StyledComponent = styled.div`
  border-radius: 3px;
  overflow: hidden;
  height: 100%;
  background-color: #fff;
  color: #1d3130;
  margin-bottom: 40px;
  
  .list-thumb {
    position: relative;
    height: 235px;
    width: 100%;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .thumb-status {
      position: absolute;
      top: 30px;
      right: 30px;
      background-color: rgba(0, 166, 81, 0.7);
      border-radius: 30px;
      padding: 5px 15px;
      
      span {
        font-size: 10px;
        line-height: 12px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 700;
      }
    }
    
    .thumb-soldout {
      position: absolute;
      top: 30px;
      right: 30px;
      background-color: rgba(255, 0, 0, 0.7);
      border-radius: 30px;
      padding: 5px 15px;
      
      span {
        font-size: 10px;
        line-height: 12px;
        color: #fff;
        text-transform: uppercase;
        font-weight: 700;
      }
    }
  }
  
  .list-info {
    padding: 30px;
    
    .list-address {
      font-size: 12px;
      line-height: 14px;
      color: rgba(29, 49, 48, 0.5);
      display: block;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    
    .list-title {
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 15px;
      font-weight: 700;
      text-transform: uppercase;
    }
    
    .list-btn {
      display: inline-block;
      font-size: 12px;
      line-height: 14px;
      color: #00a651;
      font-weight: 700;
      text-transform: uppercase;
      border-bottom: 1px solid #00a651;
      padding-bottom: 5px;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        color: #037d3e;
        border-color: #037d3e;
      }
      
      &.disabled {
        color: rgba(0, 166, 81, 0.5);
        border-color: rgba(0, 166, 81, 0.5);
        cursor: not-allowed;
        pointer-events: none;
      }
    }
  }
`;

export default ProjectSingle;