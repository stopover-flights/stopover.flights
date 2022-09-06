/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSearchEntry = /* GraphQL */ `
  mutation CreateSearchEntry(
    $input: CreateSearchEntryInput!
    $condition: ModelSearchEntryConditionInput
  ) {
    createSearchEntry(input: $input, condition: $condition) {
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
export const updateSearchEntry = /* GraphQL */ `
  mutation UpdateSearchEntry(
    $input: UpdateSearchEntryInput!
    $condition: ModelSearchEntryConditionInput
  ) {
    updateSearchEntry(input: $input, condition: $condition) {
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
export const deleteSearchEntry = /* GraphQL */ `
  mutation DeleteSearchEntry(
    $input: DeleteSearchEntryInput!
    $condition: ModelSearchEntryConditionInput
  ) {
    deleteSearchEntry(input: $input, condition: $condition) {
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
