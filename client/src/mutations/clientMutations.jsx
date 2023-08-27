import { gql } from "@apollo/client";

const ADD_CLIENT = gql`
  mutation addClient($name: String!, $email: String!, $phone: String!) {
    addClient(name: $name, email: $email, phone: $phone) {
      id
      name
      email
      phone
    }
  }
`;

const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) {
      id
      name
      email
      phone
    }
  }
`;

const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $name: String!
    $phone: String!
    $email: String!
  ) {
    updateClient(id: $id, name: $name, phone: $phone, email: $email) {
      id
      name
      phone
      email
    }
  }
`;

export { ADD_CLIENT, DELETE_CLIENT, UPDATE_CLIENT };
