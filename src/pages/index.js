import React from "react";
import { Link, graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo"
import BookSection from '../components/book-section';
import LinkButton from '../components/link-button';

const IndexPage = (props) => {
  const { data } = props;
  const { allBook } = data;
  const { edges } = allBook;

  return (
    <section>
      {edges.map((edge) => {
        const { node } = edge;
        const { author, id, localImage, summary, title } = node;
        let childImageSharp = null;
        let fixed = null;

        if (localImage) {
          childImageSharp = localImage.childImageSharp;
          if (childImageSharp) {
            fixed = childImageSharp.fixed;
          }
        }

        const bookCover = fixed ? fixed : null;

        return (
          <BookSection
            bookAuthor={author.name}
            bookCover={bookCover}
            // bookCover={localImage.childImageSharp.fixed}
            bookSummary={summary}
            bookTitle={title}
            key={id}
          >
            <LinkButton>
              <Link to={`/book/${id}`}>
                Join conversation
              </Link>
            </LinkButton>
          </BookSection>
        );
      })}
    </section>
  );
};

export const query = graphql`
  {
    allBook {
      edges {
        node {
          author {
            name
          }
          id
          localImage {
            childImageSharp{
              fixed(width:200) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          summary
          title
        }
      }
    }
  }
`;


export default IndexPage
