var mysql = require ( "mysql" );

var connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "my_first_db"
});

connection.connect ( function ( err ) {

    if ( err ) {

        console.log ( "Oops something went wrong to the Database connectivity...!", err );
    }
    else {

        console.log ( "Database Connected Successfully...!" );
    }
});

module.exports = connection;