DROP TABLE users;
DROP TABLE passwords;
DROP TABLE games;
DROP TABLE lists;
DROP TABLE userlists;

CREATE TABLE users (
	userid integer primary key, 
	username text not null);
CREATE TABLE passwords (
	userid integer not null, 
	password text not null,
	foreign key(userid) references users(userid));
CREATE TABLE games (
	gameid integer primary key, 
	gamename text not null, 
	gamedesc text,
	releasedate text);
CREATE TABLE userlists (
	userid integer not null, 
	listid integer primary key,
	foreign key(userid) references users(userid));
CREATE TABLE lists (
	listid integer, 
	gameid integer,
	foreign key(gameid) references games(gameid),
	foreign key(listid) references userlists(listid));

insert into users values ('1', 'cheze');
insert into users values ('2', 'deze');
insert into users values ('3', 'zakk');
insert into users values ('4', 'kane');
insert into users values ('5', 'chase');
insert into users values ('6', 'zulin');
insert into users values ('7', 'nintendofan');

insert into passwords values ('1', 'overlord327');
insert into passwords values ('2', 'qwerty12');
insert into passwords values ('3', 'notcheze92');
insert into passwords values ('4', 'cykablyat');
insert into passwords values ('5', 'bestinmariocart');
insert into passwords values ('6', 'indiesftw');
insert into passwords values ('7', 'ilovemario');

insert into games values ('1', 'Hollow Knight', 'Metroidvania', '2017');
insert into games values ('2', 'Dead Cells', '2d Rogue-lite', '2018');
insert into games values ('3', 'Super Mario Odyssey', '3d Platformer', '2017');
insert into games values ('4', 'Breath of the Wild', 'Zelda Adventure', '2017');
insert into games values ('5', 'Skyrim', 'RPG', '2017');
insert into games values ('6', 'Octopath Traveler', 'JRPG', '2018');
insert into games values ('7', 'Sonic Mania', '2d Platformer', '2017');
insert into games values ('8', 'Rocket League', 'Car Soccer', '2017');

insert into userlists values ('1', '1');
insert into userlists values ('2', '2');
insert into userlists values ('3', '3');
insert into userlists values ('4', '4');
insert into userlists values ('5', '5');
insert into userlists values ('6', '6');
insert into userlists values ('7', '7');

insert into lists values ('1', '1');
insert into lists values ('1', '2');
insert into lists values ('1', '3');
insert into lists values ('1', '4');
insert into lists values ('1', '5');
insert into lists values ('1', '6');
insert into lists values ('1', '7');
insert into lists values ('1', '8');
insert into lists values ('2', '7');
insert into lists values ('3', '1');
insert into lists values ('3', '2');
insert into lists values ('3', '3');
insert into lists values ('3', '4');
insert into lists values ('4', '6');
insert into lists values ('4', '1');
insert into lists values ('4', '8');