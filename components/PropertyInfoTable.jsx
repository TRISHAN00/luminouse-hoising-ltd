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
              {data.type?.toUpperCase() && (
                <>
                  <LabelCell>Type</LabelCell>
                  <TableCell>{data.type?.toUpperCase()}</TableCell>
                </>
              )}

              {data.nof && (
                <>
                  <LabelCell>No of Floor</LabelCell>
                  <TableCell>{data.nof}</TableCell>
                </>
              )}
            </TableRow>

            <TableRow>
              {data.location && (
                <>
                  <LabelCell>Address</LabelCell>
                  <TableCell>{data.location}</TableCell>
                </>
              )}

              {data.nop && (
                <>
                  <LabelCell>No of Parking</LabelCell>
                  <TableCell>{data.nop}</TableCell>
                </>
              )}
            </TableRow>

            <TableRow>
              {data.land_area && (
                <>
                  <LabelCell>Land Area</LabelCell>
                  <TableCell>{data.land_area}</TableCell>
                </>
              )}

              {data.apartment_size && (
                <>
                  <LabelCell>Apartment Size</LabelCell>
                  <TableCell>{decodeHtml(data.apartment_size)}</TableCell>
                </>
              )}
            </TableRow>

            <TableRow>
              {data.facing && (
                <>
                  <LabelCell>Plot Facing</LabelCell>
                  <TableCell>{data.facing}</TableCell>
                </>
              )}

              {data.fr && (
                <>
                  <LabelCell>Front Road</LabelCell>
                  <TableCell>{data.fr}</TableCell>
                </>
              )}
            </TableRow>

            <TableRow>
              {data.architecture && (
                <>
                  <LabelCell>Architecture</LabelCell>
                  <TableCell>{data.architecture}</TableCell>
                </>
              )}

              {data.engineer && (
                <>
                  <LabelCell>Engineer</LabelCell>
                  <TableCell>{data.engineer}</TableCell>
                </>
              )}
            </TableRow>
          </tbody>
        </StyledTable>
      </DesktopView>

      {/* Mobile View */}
      <MobileView>
        <MobileRow>
          {data.type?.toUpperCase() && (
            <>
              <GridContainer>
                <Label>Type</Label>
                <div>{data.type?.toUpperCase()}</div>
              </GridContainer>
            </>
          )}

          {data.nof && (
            <>
              <GridContainer $noMargin>
                <Label>No of Floor</Label>
                <div>{data.nof}</div>
              </GridContainer>
            </>
          )}
        </MobileRow>

        <MobileRow>
          {data.location && (
            <>
              <GridContainer>
                <Label>Address</Label>
                <div>{data.location}</div>
              </GridContainer>
            </>
          )}

          {data.nop && (
            <>
              <GridContainer $noMargin>
                <Label>No of Parking</Label>
                <div>{data.nop}</div>
              </GridContainer>
            </>
          )}
        </MobileRow>

        <MobileRow>
          {data.land_area && (
            <>
              <GridContainer>
                <Label>Land Area</Label>
                <div>{data.land_area}</div>
              </GridContainer>
            </>
          )}

          {data.architecture && (
            <>
              <GridContainer $noMargin>
                <Label>Architecture</Label>
                <div>{data.architecture}</div>
              </GridContainer>
            </>
          )}
        </MobileRow>

        <MobileRow>
          {data.apartment_size && (
            <>
              <GridContainer>
                <Label>Apartment Size</Label>
                <div>{decodeHtml(data.apartment_size)}</div>
              </GridContainer>
            </>
          )}

          {data.engineer && (
            <>
              <GridContainer $noMargin>
                <Label>Engineer</Label>
                <div>{data.engineer}</div>
              </GridContainer>
            </>
          )}
        </MobileRow>
        <MobileRow>
          {data.facing && (
            <>
              <GridContainer>
                <Label>Plot Facing</Label>
                <div>{data.facing}</div>
              </GridContainer>
            </>
          )}
          {data.fr && (
            <>
              <GridContainer>
                <Label>Front Road</Label>
                <div>{data.fr}</div>
              </GridContainer>
            </>
          )}
        </MobileRow>
      </MobileView>
    </Container>
  );
}
