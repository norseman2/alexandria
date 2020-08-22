/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGoogleBooks = /* GraphQL */ `
  query GetGoogleBooks($search: String) {
    getGoogleBooks(search: $search) {
      id
      name
      description
      author
      year
    }
  }
`;
export const getBook = /* GraphQL */ `
  query GetBook($id: ID!) {
    getBook(id: $id) {
      id
      name
      description
      author
      year
      createdAt
      updatedAt
    }
  }
`;
export const listBooks = /* GraphQL */ `
  query ListBooks(
    $filter: ModelBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        author
        year
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
