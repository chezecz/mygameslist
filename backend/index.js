// Importing Libraries

const express = require('express');
const path = require('path');
const express_graphql = require('express-graphql');
const sqlite3 = require('sqlite3').verbose();
const Sequelize = require('sequelize');
const cors = require('cors');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

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
		userid: {type: new GraphQLNonNull(GraphQLInt)},
		username: {type: GraphQLString},
		password: {
			type: PasswordSchema,
			resolve: function(root, args, context) {
				userid = root.userid
				return Password.findOne({where: {userid}}).then(password => {
					return password.get({plain: true})
				})
			} 
		}
	})
});

const PasswordSchema = new GraphQLObjectType({
	name: "Password",
	fields: () => ({
		userid: {type: new GraphQLNonNull(GraphQLInt)},
		password: {type: GraphQLString}
	})
});

const GameSchema = new GraphQLObjectType({
	name: "Game",
	fields: () => ({
		gameid: {type: new GraphQLNonNull(GraphQLInt)},
		gamename: {type: GraphQLString},
		gamedesc: {type: GraphQLString},
		releasedate: {type: GraphQLString}
	})
});

const ListSchema = new GraphQLObjectType({
	name: "List",
	fields: () => ({
		listid: {type: GraphQLInt},
		user: {
			type: UserSchema,
			resolve: function(list) {
				return User.findById(userid).then(list => {
						return list
					})
			}
		}
	})
});

const ListGameSchema = new GraphQLObjectType({
	name: "ListGame",
	fields: () => ({
		listid: {type: GraphQLInt},
		gameid: {type: GraphQLInt},
		game: {
			type: GameSchema,
			resolve: function(game) {
				return Game.findById(game.gameid).then(games => {
					return games
				})
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
				return User.findAll().then(users => {
					return users
				})
			}
		},
		games: {
			type: new GraphQLList(GameSchema),
			resolve: function() {
				return Game.findAll().then(games => {
					return games
					})
			}
		},
		user: {
			type: UserSchema,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: function(root, args, context) {
				userid = args.id
				return User.findOne({where: {userid}}).then(user => {
					return user.get({plain: true})
				})
			}
		},
		game: {
			type: GameSchema,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: function(root, args, context) {
				id = args.id
				return Game.findById(id).then(game => {
					return game.get({plain: true})
				})
			}
		},
		lists: {
			type: new GraphQLList(ListSchema),
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: function(root, args, context) {
				userid = args.id
				return UserList.findAll({
					where: {
						userid: userid
					}}).then(lists => {
						return lists
					})
			}
		},
		listgames: {
			type: new GraphQLList(ListGameSchema),
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: function(root, args, context) {
				listid = args.id
				return List.findAll({
					where: {
						listid: listid
					},
					include: [{
						model: Game,
						assosiation: GameAcc
					}]
				}).then(result => {
					return result
				})
			}
		},
		checkuser: {
			type: UserSchema,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: GraphQLString
				}
			},
			resolve: function(root, args, context) {
				username = args.name
				password = args.password
				return User.findAll({
					where: {
						username: username
					},
					include: [{
						model: Password,
						assosiation: Account
					}]
				}).then(result => {
					for (var user in result) {
						return result[user].get({plain: true})
					}
				})
			}
		}
	})
});

const MainRootMutation = new GraphQLObjectType({
	name: "RootMutation",
	fields: () => ({
		newuser: {
			type: UserSchema,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function(root, args, context) {
				username = args.name
				password = args.password
				return User.create({
					username: username,
					// password: {
					// 	password: password
					// }
				},
				// {
				// 	include: [{
				// 		model: Password,
				// 		assosiation: Account
				// 	}]
				// }
				).then(result => {return Password.create({
					userid: result.userid,
					password: password
				})})
				.then(result => {return null})
				.catch(err => console.log(err))
			}
		},
		newgame: {
			type: GameSchema,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				description: {
					type: new GraphQLNonNull(GraphQLString)
				},
				releasedate: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function(root, args, context) {
				gamename = args.name
				gamedesc = args.description
				releasedate = args.releasedate
				return Game.create({
					gamename: gamename,
					gamedesc: gamedesc,
					releasedate: releasedate
				}).then(result => {return result})
				.catch(err => console.log(err))
			}
		},
		newlist: {
			type: ListSchema,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLInt)
				}
			},
			resolve: function(root, args, context) {
				userid = args.id
				return UserList.create({
					userid: userid
				}).then(result => {return result})
			}
		}
	})
});

const MainSchema = new GraphQLSchema({
	query: MainRootResolver,
	mutation: MainRootMutation
});

// Setting up Sequelize object for sqlite3 database

const sequelize = new Sequelize('database', null, null, {
	host: 'localhost',
	dialect: 'sqlite',
	operatorsAliases: false,
	logging: false,
	define: {
		timestamps: false
	},
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	storage: __dirname+'/../database/gamesdatabase.db'
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
		primaryKey: true,
		autoIncrement: true
	}
}, {
	tableName: 'users'
});

// Passwords Table

const Password = sequelize.define('password', {
	userid: {
		type: Sequelize.INTEGER,
		field: 'userid',
		primaryKey: true
	},
	password: {
		type: Sequelize.STRING,
		field: 'password'
	}
});

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
});

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
	},
});

// Lists table

const List = sequelize.define('list', {
	listid: {
		type: Sequelize.INTEGER,
		field: 'listid',
		primaryKey: true
	},
	gameid: {
		type: Sequelize.INTEGER,
		field: 'gameid',
		primaryKey: true
	}
});

// Defining Foreign Keys

var Account = Password.belongsTo(User, {foreignKey: 'userid'});
User.hasOne(Password, {foreignKey: 'userid'});

UserList.belongsTo(User, {foreignKey: 'userid'});
User.hasMany(UserList, {foreignKey: 'userid'});

var GameAcc = List.belongsTo(Game, {foreignKey: 'gameid'});
Game.hasMany(List, {foreignKey: 'gameid'});

List.belongsTo(UserList, {foreignKey: 'listid'});
UserList.hasMany(List, {foreignKey: 'listid'});

sequelize.sync({force: false})

// Authorization

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) { return done(err); }
//       if (!user) {
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// App Routing

app.use(cors());

app.use(express.static(__dirname+'/../'));

app.use('/', express.static(__dirname+'/../dist/mygameslist/'));

app.listen(4000, () => console.log('Server activated'));

// GraphQL Interactive Interface

app.use('/graphql', express_graphql({
	schema: MainSchema,
	graphiql: true
}));

app.use('/graph', express_graphql({
	schema: MainSchema,
	graphiql: false
}));

// Redirect to any Route

app.get("*", (req, res) => {
    res.redirect("/")
})

// Error handling for invalid requests

app.use(function (req, res, next) {
	res.status(404).send('Whoops')
});

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Whoops')
});