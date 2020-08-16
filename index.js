var express = require ( "express" );
var app = express();

var bodyParser = require ( "body-parser" );

var userModel = require ( "./src/UserModel/UserModel" );

var clientResponseSend = require ( "./src/ClientResponseSend" );


app.use ( bodyParser.json() );
app.use ( bodyParser.urlencoded ( { extended: true } ) );


app.use ( "/user", userModel );


app.use ( "*", function ( req, res ) {

    let response = {
        "result": "Failed",
        "message": "Invalid URL...!"
    };

    clientResponseSend ( res, 404, response );
})

app.listen ( 8001 );