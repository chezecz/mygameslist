// Importing Libraries

const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

// Importing GraphQL Objects
const {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLSchema,
} = require('graphql');

// Importing Database Objects

const db = require('./dbmodels');

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
				return db.Password.findOne({where: {userid}}).then(password => {
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
				return db.User.findById(userid).then(list => {
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
				return db.Game.findById(game.gameid).then(games => {
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
				return db.User.findAll().then(users => {
					return users
				})
			}
		},
		games: {
			type: new GraphQLList(GameSchema),
			resolve: function() {
				return db.Game.findAll().then(games => {
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
				return db.User.findOne({where: {userid}}).then(user => {
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
				return db.Game.findById(id).then(game => {
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
				return db.UserList.findAll({
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
				return db.List.findAll({
					where: {
						listid: listid
					},
					include: [{
						model: db.Game
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
				return db.User.findOne({
					where: {
						username: username
					},
					include: [{
						model: db.Password,
						assosiation: db.Account
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
							return db.User.findById(result.get({plain: true}).userid).then(user => {
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
				response = {}
				password = await bcrypt.hash(args.password, 10)
				return db.User.findOne({ where: {
					username: username
				}
				}).then(check => {if (check) {return response} else {
					return db.User.create({
					username: username
				}
				).then(result => {return db.Password.create({
					userid: result.userid,
					password: password
				})})
				.then(result => {
					token = jsonwebtoken.sign(
						    	{ id: result.userid, username: username },
						    	'teamsecret'
						    )
					response.username = username
					response.userid = result.userid
					response.token = token
					return response
				})
				.catch(err => console.log(err))
				}})
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
				return db.Game.create({
					gamename: gamename,
					gamedesc: gamedesc,
					releasedate: releasedate
				}).then(result => {return result})
				.catch(err => console.log(err))
			}
		},
		addlist: {
			type: ListSchema,
			resolve: function(root, args, context) {
				return db.UserList.create({
					userid: context.user.id
				}).then(result => {
					return result
				})
			}
		},
		addgame: {
			type: ListGameSchema,
			args: {
				listid: {type: new GraphQLNonNull(GraphQLInt)},
				gameid: {type: new GraphQLNonNull(GraphQLInt)}
			},
			resolve: function(root, args, context) {
				listid = args.listid
				gameid = args.gameid
				return db.List.create({
					listid: listid,
					gameid: gameid
				}).then(result => {return result})
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
				return db.UserList.create({
					userid: userid
				}).then(result => {return result})
			}
		}
	})
});

var MainSchema = new GraphQLSchema({
	query: MainRootResolver,
	mutation: MainRootMutation
});

exports.Schema = MainSchema;