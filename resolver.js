// db constant
import db from './_db.js';

// resolvers: determins the response to queries for different data graphs
const resolvers = {
	Query: {
		games() {
			return db.games;
		},
		authors() {
			return db.authors;
		},
		reviews() {
			return db.reviews;
		},

		// Resolver: Query Variables with id
		// parameters: parent, args, context
		game(_, args) {
			return db.games.find((game) => game.id === args.gameId);
		},
		author(_, args) {
			return db.authors.find((author) => author.id === args.authorId);
		},
		review(_, args) {
			return db.reviews.find((review) => review.id === args.reviewId);
		},
	},

	// Relationships
	Game: {
		reviews(parent) {
			// parent: the fields for the GAME
			// check if the parent "game ID" is equal to "review game_id"
			return db.reviews.filter((review) => parent.id === review.game_id);
		},
	},
	Author: {
		reviews(parent) {
			// same as GAME logic
			return db.reviews.filter((review) => parent.id === review.author_id);
		},
	},

	// Nested Queries
	Review: {
		game(parent) {
			// finds parent "review game_id" if equal to "game ID"
			return db.games.find((game) => parent.game_id === game.id);
		},
		author(parent) {
			// find parent "review author_id" if equal to "author ID"
			return db.authors.find((author) => parent.author_id === author.id);
		},
	},

	Mutation: {
		deleteGame(_, args) {
			const newGames = db.games.filter((game) => args.gameId !== game.id);
			return newGames;
		},
		addGame(_, args) {
			const addedGame = {
				...args.game,
				id: Math.floor(Math.random() * 1000).toString(),
			};

			db.games.push(addedGame);
			return addedGame;
		},
		updateGame(_, args) {
			const updatedGame = db.games.map((game) => {
				if (game.id === args.gameId) {
					return { ...game, ...args.editGame };
				}

				return game;
			});

			return updatedGame.find((game) => args.gameId === game.id);
		},
	},
};

export default resolvers;
