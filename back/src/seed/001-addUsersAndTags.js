export default /* GraphQL */ `
  mutation {
    u1: CreateUser(id: "u1", name: "Will") {
      id
      name
    }
    t1: CreateTag(id: "t1", name: "redux") {
      id
      name
    }
    tagging1: AddUserTaggings(
      from: { id: "t1" }
      to: { id: "u1" }
      data: {
        text: "Bill has been building redux-driven Commodore64 games since 1974."
      }
    ) {
      from {
        name
      }
      to {
        name
      }
      text
    }
  }
`;
