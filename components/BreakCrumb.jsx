import styled from "styled-components";

export default function BreakCrumb() {
  return (
    <BreakCrumbStyled className="breakcrub-container">
      <span>Residential</span> | <span>Shahidabag</span> |{" "}
      <span>2000 & 2500 sft</span>
    </BreakCrumbStyled>
  );
}

const BreakCrumbStyled = styled.div`
  margin-top: 40px;
  position: relative;
  text-align: center;
  color: #ffffff84;
  display: flex;
  justify-content: center;
  gap: 20px; /* default for small screens */
  overflow: hidden;

  @media (min-width: 767px) {
    gap: 40px;
  }
`;

