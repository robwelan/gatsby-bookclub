import React, { useContext } from 'react';
import { graphql } from "gatsby";
import BookSection from '../components/book-section';
import { BookComments } from '../components/common';
import { FirebaseContext } from '../components/firebase';

const Book = (props) => {
  const { firebase } = useContext(FirebaseContext);
  const { data } = props;
  const { book } = data;
  const { author, id, localImage, summary, title } = book;

  return (
    <section>
      <BookSection
        bookCover={localImage.childImageSharp.fixed}
        bookAuthor={author.name}
        bookSummary={summary}
        bookTitle={title}
      />
      {!!firebase && (
        <BookComments firebase={firebase} bookId={id} />
      )}
    </section>
  );
};

export const query = graphql`
  query BookQuery($bookId: String!) {
    book(id: { eq: $bookId }) {
      author {
        name
      }
      id
      localImage {
        childImageSharp {
          fixed(width:200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      summary
      title
      }
    }
`;

export default Book;
