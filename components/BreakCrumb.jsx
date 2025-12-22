import HTMLReactParser from "html-react-parser";
import styled from "styled-components";

export default function BreakCrumb({ data }) {
  return (
    <BreakCrumbStyled className="breakcrub-container">
      <span>{data?.product_data?.type?.toUpperCase()}</span> |{" "}
      <span>{data?.product_data?.location?.toUpperCase()}</span> |
      <span>{HTMLReactParser(data?.product_data?.sft?.toUpperCase() || '')}</span>
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
  flex-wrap: wrap;

  @media (min-width: 767px) {
    gap: 40px;
  }
`;
