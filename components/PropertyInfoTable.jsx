import styled from 'styled-components';

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
  margin-bottom: ${props => props.$noMargin ? '0' : '0.5rem'};
`;

const Label = styled.div`
  font-weight: 500;
`;

export default function PropertyInfoTable() {
  const propertyData = [
    { label: 'Type', value: 'Residential', label2: 'No of Floor', value2: 'G+9 Storied' },
    { label: 'Address', value: '525/KA, Shahidbag, Dhaka', label2: 'No of Parking', value2: '10' },
    { label: 'Land Area', value: '8 (Katha)', label2: 'Architecture', value2: 'Arch. Shajedul Islam' },
    { label: 'Apartment Size', value: '2000 & 2500 sft', label2: 'Engineer', value2: 'Engr. A.K.M Liaqat Ali' },
  ];

  return (
    <Container>
      {/* Desktop view (md and larger screens) */}
      <DesktopView>
        <StyledTable>
          <tbody>
            {propertyData.map((row, index) => (
              <TableRow key={index}>
                <LabelCell>{row.label}</LabelCell>
                <TableCell>{row.value}</TableCell>
                <LabelCell>{row.label2}</LabelCell>
                <TableCell>{row.value2}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      </DesktopView>

      {/* Mobile view (smaller than md screens) */}
      <MobileView>
        {propertyData.map((row, index) => (
          <MobileRow key={index}>
            <GridContainer>
              <Label>{row.label}</Label>
              <div>{row.value}</div>
            </GridContainer>
            <GridContainer $noMargin>
              <Label>{row.label2}</Label>
              <div>{row.value2}</div>
            </GridContainer>
          </MobileRow>
        ))}
      </MobileView>
    </Container>
  );
}