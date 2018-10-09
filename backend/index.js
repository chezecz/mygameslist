// Importing Libraries

const express = require('express');
const path = require('path');
const express_graphql = require('express-graphql');
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');
const Sequelize = require('sequelize');
const cors = require('cors');
const session = require("express-session");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const MemoryStore = require('memorystore')(session);
require('dotenv').load();

sql_user = process.env.SQL_USER;
sql_password = process.env.SQL_PASSWORD;
sql_database = process.env.SQL_DATABASE;
sql_instance = process.env.INSTANCE_CONNECTION_NAME;

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

// Activating Frameworks

app.use(cors());

app.use(session({
    store: new MemoryStore({
      checkPeriod: 86400000
    }),
    resave: true,
    saveUninitialized: true,
    secret: 'teamsecret'
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(express.static(__dirname+'/../'));

// GraphQL Schema

const LogInSchema = new GraphQLObjectType({
	name: "LogInUser",
	fields: () => ({
		username: {type: GraphQLString},
		userid: {type: GraphQLInt},
		token: {type: GraphQLString}
	})
});

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
				console.log(context)
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
						model: Game
					}]
				}).then(result => {
					return result
				})
			}
		},
		checkuser: {
			type: LogInSchema,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: function(root, args, req) {
				username = args.name
				password = args.password
				return User.findOne({
					where: {
						username: username
					},
					include: [{
						model: Password,
						assosiation: Account
					}]
				}).then(function(result) {
					if (result == null) {
						return null
					}
					dbPassword = result['password'].dataValues.password
					user = result.get({plain: true})
					return bcrypt.compare(password, dbPassword).then(function(res) {
						if (!res) {
							return null
						} else {
							return User.findById(result.get({plain: true}).userid).then(user => {
								token = jsonwebtoken.sign(
						            { id: user.userid, username: user.username },
						            'teamsecret'
						          )
								result = user.get({plain: true})
								result.token = token
								return result
							})
						}
					})
				})
			}
		}
	})
});

const MainRootMutation = new GraphQLObjectType({
	name: "RootMutation",
	fields: () => ({
		newuser: {
			type: LogInSchema,
			args: {
				name: {
					type: new GraphQLNonNull(GraphQLString)
				},
				password: {
					type: new GraphQLNonNull(GraphQLString)
				}
			},
			resolve: async function(root, args, context) {
				username = args.name
				password = await bcrypt.hash(args.password, 10)
				return User.create({
					username: username
				}
				).then(result => {return Password.create({
					userid: result.userid,
					password: password
				})})
				.then(result => {return null})
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

// Setting up Sequelize object for mysql database

const sequelize = new Sequelize(sql_database, sql_user, sql_password, {
	host: '/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}',
	dialect: 'mysql',
	operatorsAliases: false,
	logging: false,
	define: {
		timestamps: false
	},
	dialectOptions: {
        socketPath: '/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}'
    },
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
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

// App Routing

const auth = jwt({
      secret: 'teamsecret',
      credentialsRequired: false,
      getToken: function fromHeaderOrQuerystring (req) {
		    if (req.headers.authorization.split(' ')[1] != 'null'  && req.headers.authorization.split(' ')[0] === 'Bearer') {
		        console.log(req.headers.authorization.split(' ')[1])
		        return req.headers.authorization.split(' ')[1];
		    }
		    return null;
		  }
    });

app.use('/', express.static(__dirname+'/../dist/mygameslist/'));

app.listen(8080, () => console.log('Server activated'));

// GraphQL Interactive Interface

app.use('/graphql', auth, express_graphql({
	schema: MainSchema,
	graphiql: true
}));

app.use('/graph', bodyParser.json(), auth, express_graphql(req => ({
	schema: MainSchema,
	graphiql: false,
	context: {
		user: req.user
	}
})));

// Redirect to any Route

app.get("*", (req, res) => {
    res.sendFile(path.normalize(__dirname+'/../dist/mygameslist/index.html'));
})

// Error handling for invalid requests

app.use(function (req, res, next) {
	res.status(404).send('Whoops')
});

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Whoops')
});
