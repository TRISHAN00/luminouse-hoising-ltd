import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function NewsCard({ item }) {
  return (
    <NewsCardWrap>
      <Link href={`/news/${item.slug}`} passHref>
        <CardContent>
          <ImageWrapper>
            <ImageContainer>
              {item?.image && (
                <Image
                  src={item?.image}
                  alt={item?.title || "News Image"}
                  fill
                  style={{
                    objectFit: "cover",
                    transition: "all 0.4s ease-in-out",
                  }}
                />
              )}

              <DarkOverlay />
            </ImageContainer>
            <WhiteOverlay />
          </ImageWrapper>

          <CardInfo>
            <CardTitle>{typeof item?.title === 'string' ? item?.title : 'Luxury Residential Project'}</CardTitle>
            <CardFooter>
              <DateNumber>{item?.date?.split(" ")[0]}</DateNumber>
              <DateInfo>
                <DateMonth>
                  {item?.date?.split(" ")[1]} {item?.date?.split(" ")[2]}
                </DateMonth>
                <CardCategory>{item?.category}</CardCategory>
              </DateInfo>
            </CardFooter>
          </CardInfo>
        </CardContent>
      </Link>
    </NewsCardWrap>
  );
}

const NewsCardWrap = styled.article`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
  position: relative;
`;

const CardInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
  color: #333;
  transition: color 0.3s ease;

  ${NewsCardWrap}:hover & {
    color: white;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 580px !important;
  overflow: hidden;

  @media (min-width: 767px) {
    height: 480px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform: scale(1);
  transition: transform 0.7s ease;

  ${NewsCardWrap}:hover & {
    transform: scale(1.05);
  }
`;

const WhiteOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  transition: transform 0.5s ease;
  z-index: 2;

  ${NewsCardWrap}:hover & {
    transform: translateY(100%);
  }
`;

const DarkOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const DateNumber = styled.span`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1;
  color: #000;
  transition: color 0.3s ease;

  ${NewsCardWrap}:hover & {
    color: white;
  }
`;

const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DateMonth = styled.span`
  font-size: 0.9rem;
  color: #666;
  transition: color 0.3s ease;

  ${NewsCardWrap}:hover & {
    color: white;
  }
`;

const CardCategory = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.25rem;
  transition: color 0.3s ease;

  ${NewsCardWrap}:hover & {
    color: white;
  }
`;