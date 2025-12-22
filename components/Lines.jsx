

'use client'
import styled from "styled-components";

const Line = ({background}) => {
    return (
        <StyledComponent background={background}  className={'vertical-lines'}>
            <span/>
            <span/>
            <span/>
            <span/>
        </StyledComponent>
    );
};

const StyledComponent = styled.div`
  span {
    width: 1px;
    background-color: ${p => p.background || '#e9e9e921'};
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;

    &:nth-of-type(1) {
      left: 20%;
    }

    &:nth-of-type(2) {
      left: 40%;
    }

    &:nth-of-type(3) {
      left: 60%;
    }

    &:nth-of-type(4) {
      left: 80%;
    }
  }

  @media (max-width: 650px) {
    span {
      &:nth-last-of-type(1) {
        display: none;
      }

      &:nth-of-type(1) {
        left: 23%;
      }

      &:nth-of-type(2) {
        left: 50%;
      }

      &:nth-of-type(3) {
        right: 23%;
        left: auto;
      }
    }
  }
`;

export default Line;
