import { ApolloServer, gql } from "apollo-server";
import crypto from "crypto";

//console.log(crypto.randomUUID());

const users = [
  {
    id: "referfs",
    firstname: "Godfrey",
    lastName: "Lebo",
    email: "emorilebo@gmail.com",
    password: "12345",
  },
  {
    id: "fwef232",
    firstname: "Danny",
    lastName: "Crane",
    email: "dannycrane@gmail.com",
    password: "123456",
  },
];

const typeDefs = gql`
  type Query {
    # greet:String
    users: [User]
    user(id: ID!): User
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Mutation {
    createUser(userNew: UserInput!): User
  }
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }
`;

const resolvers = {
  Query: {
    // greet:()=>"Hello Emori"
    users: () => users,
    user: (parent, { id }, context) => {
      console.log(id);
      return users.find((item) => item.id == id);
    },
  },
    Mutation: {
      createUser: (_, { userNew })=>{
        const newUser = {
            id:crypto.randomUUID(),
            ...userNew
        }
        users.push(newUser)
        return newUser;
      }
    },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});