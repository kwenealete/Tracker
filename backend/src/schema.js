const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
        measurements: [Measurements!]!
    }

    type Measurements {
        id: ID!
        weight: Float!
        user: User!
        createdAt: String!
    }

    type Query {
        user(id: ID!): User
        users: [User!]!
        measurement(id: ID!): Measurements
        measurements: [Measurements!]!
        
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): User!
        createMeasurement(UserId: ID!,createdAt: String! weight: Float!): Measurements!
        updateMeasurement(id: ID!, weight:  Float): [Int!]!
        deleteMeasurement(id: ID!): Int!
    }
`;

module.exports = typeDefs;