// scalar types: string, int, boolean, ID
export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!

    # relation 
    reviews: [Review!]
  }

  type Review {
    id: ID!
    rating: Int!
    content: String!

    # relation 
    game: Game!
    author: Author!
  }

  type Author {
    id: ID!
    name: String!
    verified: Boolean!

    # relation 
    reviews: [Review!]
  } 

  type Query {
    games: [Game]
    reviews: [Review]
    authors: [Author]

    # Schema: Query Variables with id
    game(gameId: ID!): Game
    review(reviewId: ID!): Review
    author(authorId: ID!): Author
  }

  type Mutation {
    deleteGame(gameId: ID!): [Game!]
    addGame(game: AddGameInput!): Game
    updateGame(gameId: ID!, editGame: UpdateGameInput!): Game
  }

  input AddGameInput {
    title: String!
    platform: [String!]!
  }

  input UpdateGameInput {
    title: String,
    platform: [String!]
  }
`;
