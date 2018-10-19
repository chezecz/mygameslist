const Sequelize = require('sequelize');
const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql');

require('dotenv').config();

sql_user = process.env.SQL_USER;
sql_password = process.env.SQL_PASSWORD;
sql_database = process.env.SQL_DATABASE;
sql_instance = '/cloudsql/' + process.env.INSTANCE_CONNECTION_NAME;

// Setting up Sequelize object for mysql database

const sequelize = new Sequelize(sql_database, sql_user, sql_password, {
	host: '35.189.5.139',
	dialect: 'mysql',
	operatorsAliases: false,
	logging: false,
	define: {
		timestamps: false
	},
	// dialectOptions: {
 //        socketPath: sql_instance
 //    },
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

exports.User = User;

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

exports.Password = Password;

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

exports.Game = Game;

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

exports.UserList = UserList;

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

exports.List = List;

// Defining Foreign Keys

var Account = Password.belongsTo(User, {foreignKey: 'userid'});
User.hasOne(Password, {foreignKey: 'userid'});

UserList.belongsTo(User, {foreignKey: 'userid'});
User.hasMany(UserList, {foreignKey: 'userid'});

var GameAcc = List.belongsTo(Game, {foreignKey: 'gameid'});
Game.hasMany(List, {foreignKey: 'gameid'});

List.belongsTo(UserList, {foreignKey: 'listid'});
UserList.hasMany(List, {foreignKey: 'listid'});

exports.Account = Account;
exports.GameAcc = GameAcc;

sequelize.sync({force: false})