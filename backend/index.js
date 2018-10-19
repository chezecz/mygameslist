// Importing Libraries
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require("express-session");
const bodyParser = require("body-parser");
const jwt = require('express-jwt');
const MemoryStore = require('memorystore')(session);
const { performance } = require('perf_hooks');
const express_graphql = require('express-graphql');

// Importing Local Modules

const GraphSchema = require('./graphmodels');

// Reading Enviromental Variables

require('dotenv').config();

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

// App Routing

const auth = jwt({
      secret: 'teamsecret',
      credentialsRequired: false,
      getToken: function fromHeaderOrQuerystring (req) {
		    if (req.headers.authorization && req.headers.authorization.split(' ')[1] != 'null'  && req.headers.authorization.split(' ')[0] === 'Bearer') {
		        return req.headers.authorization.split(' ')[1];
		    }
		    return null;
		  }
    });

app.use('/', express.static(__dirname+'/../dist/mygameslist/'));

app.listen(8080, () => console.log('Server activated'));

// GraphQL Interactive Interface

app.use('/graphql', auth, express_graphql({
	schema: GraphSchema.Schema,
	graphiql: true
}));

app.use('/graph', bodyParser.json(), auth, express_graphql(req => ({
	schema: GraphSchema.Schema,
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
