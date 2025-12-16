// creating a basic Apollo Server

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";


// Schema 
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    points: Int!
  }
  type Query {
    hello: String!
    users: [User!]!
    user(id: ID!): User
  }
`;

// Sample data
const users = [
  { id: "1", name: "Alice", email: "alice@example.com", points: 100 },
  { id: "2", name: "Bob", email: "bob@example.com", points: 200 },
  { id: "3", name: "Charlie", email: "charlie@example.com", points: 300 },
];

// Resolvers
const resolvers = {
  Query: {  
    hello: () => "Hello, world!",
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);