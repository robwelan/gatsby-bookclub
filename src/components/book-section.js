import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';

const SectionWrapper = styled.section`
  border: solid 1px #ddd;
  background: white;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;

  h2 {
    small {
      padding-left: 8px;
      font-size: 14px;
      font-weight: normal;
    }
  }
`;

const ImageWrapper = styled.div`
  max-width: 200px;

  img {
    max-width: 200px;
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  padding-left: 8px;
`;

const BookSection = (props) => {
  const {
    bookAuthor,
    bookCover,
    bookSummary,
    bookTitle,
    children,
  } = props;

  return (
    <SectionWrapper>
      {bookCover && (
        <ImageWrapper>
          <Img fixed={bookCover} />
        </ImageWrapper>
      )}
      <ContentWrapper>
        <h2>
          {bookTitle}
          <small>
            {bookAuthor}
          </small>
        </h2>
        <p>
          {bookSummary}
        </p>
        <div>{children}</div>
      </ContentWrapper>
    </SectionWrapper>
  )
}

export default BookSection;
