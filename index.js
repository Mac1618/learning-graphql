import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// scalar types & resolver
import resolvers from './resolver.js';
import { typeDefs } from './schema.js';

// server setup
const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const port = 4000;

// start server
const { url } = await startStandaloneServer(
	server, // apollo server
	{ listen: { port: port } } // port number
);

console.log('Running on port: ', port);
