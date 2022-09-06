/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSearchEntry = /* GraphQL */ `
  query GetSearchEntry($id: ID!) {
    getSearchEntry(id: $id) {
      id
      currentTime
      departureLocation
      arrivalLocation
      departureDate
      returnDate
      oneWay
      email
      createdAt
      updatedAt
    }
  }
`;
export const listSearchEntries = /* GraphQL */ `
  query ListSearchEntries(
    $filter: ModelSearchEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSearchEntries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        currentTime
        departureLocation
        arrivalLocation
        departureDate
        returnDate
        oneWay
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
