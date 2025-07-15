import styled from "styled-components";

const Container = styled.div`
  color: #b0b0b0;
  width: 100%;
`;

const DesktopView = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  &:not(:first-child) {
    border-top: 1px solid #444;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
`;

const LabelCell = styled(TableCell)`
  font-weight: 500;
`;

const MobileView = styled.div`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileRow = styled.div`
  border-top: 1px solid #444;
  padding: 1rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: ${(props) => (props.$noMargin ? "0" : "0.5rem")};
`;

const Label = styled.div`
  font-weight: 500;
`;

function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function PropertyInfoTable({ data }) {
  if (!data) return null;

  return (
    <Container>
      {/* Desktop View */}
      <DesktopView>
        <StyledTable>
          <tbody>
            <TableRow>
              <LabelCell>Type</LabelCell>
              <TableCell>{data.type?.toUpperCase()}</TableCell>
              <LabelCell>No of Floor</LabelCell>
              <TableCell>{data.nof}</TableCell>
            </TableRow>

            <TableRow>
              <LabelCell>Address</LabelCell>
              <TableCell>{data.location}</TableCell>
              <LabelCell>No of Parking</LabelCell>
              <TableCell>{data.nop}</TableCell>
            </TableRow>

            <TableRow>
              <LabelCell>Land Area</LabelCell>
              <TableCell>{data.land_area}</TableCell>
              <LabelCell>Architecture</LabelCell>
              <TableCell>{data.architecture}</TableCell>
            </TableRow>

            <TableRow>
              <LabelCell>Apartment Size</LabelCell>
              <TableCell>{decodeHtml(data.apartment_size)}</TableCell>
              <LabelCell>Engineer</LabelCell>
              <TableCell>{data.engineer}</TableCell>
            </TableRow>
          </tbody>
        </StyledTable>
      </DesktopView>

      {/* Mobile View */}
      <MobileView>
        <MobileRow>
          <GridContainer>
            <Label>Type</Label>
            <div>{data.type?.toUpperCase()}</div>
          </GridContainer>
          <GridContainer $noMargin>
            <Label>No of Floor</Label>
            <div>{data.nof}</div>
          </GridContainer>
        </MobileRow>

        <MobileRow>
          <GridContainer>
            <Label>Address</Label>
            <div>{data.location}</div>
          </GridContainer>
          <GridContainer $noMargin>
            <Label>No of Parking</Label>
            <div>{data.nop}</div>
          </GridContainer>
        </MobileRow>

        <MobileRow>
          <GridContainer>
            <Label>Land Area</Label>
            <div>{data.land_area}</div>
          </GridContainer>
          <GridContainer $noMargin>
            <Label>Architecture</Label>
            <div>{data.architecture}</div>
          </GridContainer>
        </MobileRow>

        <MobileRow>
          <GridContainer>
            <Label>Apartment Size</Label>
            <div>{decodeHtml(data.apartment_size)}</div>
          </GridContainer>
          <GridContainer $noMargin>
            <Label>Engineer</Label>
            <div>{data.engineer}</div>
          </GridContainer>
        </MobileRow>
      </MobileView>
    </Container>
  );
}
