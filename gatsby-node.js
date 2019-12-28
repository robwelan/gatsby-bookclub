const path = require('path');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  const bookTemplate = path.resolve('src/templates/book.js');

  return graphql(`
  {
    allBook {
      edges {
        node {
          id
        }
      }
    }
  }
  `)
  .then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    result.data.allBook.edges.forEach((book) => {
      //  console.log(book.node)
      createPage({
        path: `/book/${book.node.id}`,
        component: bookTemplate,
        context: {
          bookId: book.node.id,
        },
      });
    });
  });
};
