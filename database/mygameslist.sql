DROP TABLE users;
DROP TABLE passwords;
DROP TABLE games;
DROP TABLE lists;
DROP TABLE userlists;

CREATE TABLE users (
	userid integer primary key AUTO_INCREMENT, 
	username text not null) AUTO_INCREMENT=1;
CREATE TABLE passwords (
	userid integer not null, 
	password text not null,
	foreign key(userid) references users(userid));
CREATE TABLE games (
	gameid integer primary key AUTO_INCREMENT, 
	gamename text not null, 
	gamedesc text,
	releasedate text) AUTO_INCREMENT=1;
CREATE TABLE userlists (
	userid integer not null, 
	listid integer primary key AUTO_INCREMENT,
	foreign key(userid) references users(userid)) AUTO_INCREMENT=1;
CREATE TABLE lists (
	listid integer, 
	gameid integer,
	foreign key(gameid) references games(gameid),
	foreign key(listid) references userlists(listid));

insert into games values ('1', 'Hollow Knight', 'Metroidvania', '2017');
insert into games values ('2', 'Dead Cells', '2d Rogue-lite', '2018');
insert into games values ('3', 'Super Mario Odyssey', '3d Platformer', '2017');
insert into games values ('4', 'Breath of the Wild', 'Zelda Adventure', '2017');
insert into games values ('5', 'Skyrim', 'RPG', '2017');
insert into games values ('6', 'Octopath Traveler', 'JRPG', '2018');
insert into games values ('7', 'Sonic Mania', '2d Platformer', '2017');
insert into games values ('8', 'Rocket League', 'Car Soccer', '2017');