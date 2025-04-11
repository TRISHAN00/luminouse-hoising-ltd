'use client'
import { title } from "@/styles/globalStyleVars";
import ReactHtmlParser from "react-html-parser";
import styled from 'styled-components';

const Title = ({
                   text,
                   fontSize,
                   fontWeight,
                   color,
                   letterSpacing,
                   lineHeight,
                   textTransform,
                   margin,
                   padding,
                   borderColor,
                   varient,
                   center,
                   classname,
                   marginSm,
                   width
               }) => {


    return (

        <StyledTitle className={`title ${classname}`}
                     fontSize={fontSize}
                     fontWeight={fontWeight}
                     color={color}
                     lineHeight={lineHeight}
                     LetterSpacing={letterSpacing}
                     textTransform={textTransform}
                     margin={margin}
                     padding={padding}
                     varient={varient}
                     center={center}
                     marginSm={marginSm}
                     width={width}
                     borderColor={borderColor}>
            <h2 className={''}>{ReactHtmlParser(text)} </h2>


        </StyledTitle>

    )
};


const StyledTitle = styled.div`
  margin: ${props => props.margin || '0px'};
  position: relative;
  width: ${props => props.width || 'fit-content'};
  font-family: ${title};
  text-align: ${props => props?.center ? 'center' : ''};
  padding: ${p => p.padding};

  h2 {
    font-size: ${props => props.fontSize || 80}px;
    line-height: ${props => props.lineHeight || 80}px;
    //text-transform: uppercase;
    font-weight: ${props => props.fontWeight || '400'};
    color: ${props => props.color || "#FFF"};
  }


  @media (max-width: 767px) {
    padding: 0;
    margin: ${p => p.marginSm};
    h2 {
      font-size: 48px !important;
      line-height: 48px !important;
    }
  }
`;


export default Title;














