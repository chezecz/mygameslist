// Importing Libraries

const express = require('express');
const express_graphql = require('express-graphql');
const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');

// Importing GraphQL Objects

const {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
} = require('graphql');

// Defining Express Application

const app = express();

// GraphQL Schema

const UserSchema = new GraphQLObjectType({
	name: "User",
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLInt)},
		name: {type: GraphQLString}
	})
});

const GameSchema = new GraphQLObjectType({
	name: "Game",
	fields: () => ({
		id: {type: new GraphQLNonNull(GraphQLInt)},
		name: {type: GraphQLString}
	})
});

const ListSchema = new GraphQLObjectType({
	name: "List",
	fields: () => ({
		id: {type: GraphQLInt},
		user: {
			type: UserSchema,
			resolve: function(list) {
				return (Game.findOne().then(game => {
						console.log(game.get('gamename'));
						}))
			}
		}
	})
});

// Resolvers

const MainRootResolver = new GraphQLObjectType({
	name: "RootResolver",
	fields: () => ({
		users: {
			type: new GraphQLList(UserSchema),
			resolve: function() {
				return (User.findAll().then(users => {
							console.log(users)
						}))
			}
		},
		games: {
			type: new GraphQLList(GameSchema),
			resolve: function() {
				return Games
			}
		},
		user: {
			type: GraphQLString,
			resolve: function() {
				userid = 2
				return User.findOne({where: {userid}}).then(user => {
					console.log(user)
				})
			}
		}
	})
});

const MainSchema = new GraphQLSchema({
	query: MainRootResolver
});

// Root Resolver

var root = {
	message: () => 'Hello World!',
	user: () => getUser,
	game: () => getGame
};

// Setting up Sequelize object for sqlite3 database

const sequelize = new Sequelize('database', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	operatorsAliases: false,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	storage: 'gamesdatabase.db'
})

// Testing Connection

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Database Schemas

// User Table

const User = sequelize.define('user', {
	username: {
		type: Sequelize.STRING,
		field: 'username'
	},
	userid: {
		type: Sequelize.INTEGER,
		field: 'userid',
		primaryKey: true
	}
}, {
	tableName: 'users'
})

// Passwords Table

const Password = sequelize.define('password', {
	userid: {
		type: Sequelize.INTEGER,
		field: 'userid'
	},
	password: {
		type: Sequelize.STRING,
		field: 'password'
	}
})

// Games Table

const Game = sequelize.define('game', {
	gameid: {
		type: Sequelize.INTEGER,
		field: 'gameid',
		primaryKey: true
	},
	gamename: {
		type: Sequelize.STRING,
		field: 'gamename',
	},
	gamedesc: {
		type: Sequelize.TEXT,
		field: 'gamedesc'
	},
	releasedate: {
		type: Sequelize.STRING,
		field: 'releasedate'
	}
})

// UserLists table

const UserList = sequelize.define('userlist', {
	userid: {
		type: Sequelize.INTEGER,
		field: 'userid'
	},
	listid: {
		type: Sequelize.INTEGER,
		field: 'listid',
		primaryKey: true
	}
})

// Lists table

const List = sequelize.define('list', {
	listid: {
		type: Sequelize.INTEGER,
		field: 'listid'
	},
	gameid: {
		type: Sequelize.INTEGER,
		field: 'gameid'
	}
})

// Removing Default Sequelize Attirubutes

User.removeAttribute('id')
User.removeAttribute('createdAt')
User.removeAttribute('updatedAt')

Password.removeAttribute('id')
Password.removeAttribute('createdAt')
Password.removeAttribute('updatedAt')

Game.removeAttribute('id')
Game.removeAttribute('createdAt')
Game.removeAttribute('updatedAt')

UserList.removeAttribute('id')
UserList.removeAttribute('createdAt')
UserList.removeAttribute('updatedAt')

List.removeAttribute('id')
List.removeAttribute('createdAt')
List.removeAttribute('updatedAt')

// Defining Foreign Keys

Password.belongsTo(User, {foreignKey: 'userid'})
User.hasOne(Password, {foreignKey: 'userid'})

UserList.belongsTo(User, {foreignKey: 'userid'})
User.hasMany(List, {foreignKey: 'userid'})

List.belongsTo(Game, {foreignKey: 'gameid'})
Game.hasMany(List, {foreignKey: 'gameid'})

List.belongsTo(UserList, {foreignKey: 'listid'})
UserList.hasMany(List, {foreignKey: 'listid'})

// Queries

User.findOne().then(user => {
	console.log(user.get('username'));
})

Game.findOne().then(game => {
	console.log(game.get('gamename'));
})

User.findAll().then(users => {
	console.log(users)
})

// Sequelize Sync

sequelize
  .sync({ force: false })
  .then(function(err) {
    console.log('It worked!');
  }, function (err) {
    console.log('An error occurred while creating the table:', err);
  });

// App Routing

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Server activated'))

// GraphQL Interactive Interface

app.use('/graphql', express_graphql({
	schema: MainSchema,
	graphiql: true
}));

// Error handling for invalid requests

app.use(function (req, res, next) {
	res.status(404).send('Whoops')
})

app.use(function (err, req, res, next) {
	console.eroor(err.stack)
	res.status(500).send('Whoops')
})

// Possible usefull in the future

app.post('/post', function (req, res) {
	res.send('POST')
})

app.put('/put', function (req, res) {
	res.send('put request')
})

app.delete('/delete', function (req, res) {
	res.send('delete request')
})