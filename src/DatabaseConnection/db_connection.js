/**
 * Included the "mysql" package for MySQL database connectivity
 */
var mysql = require ( "mysql" );


/**
 * Call the "createConnection" method for database configuration
 */
var connection = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "my_first_db"
});


/**
 * Call the "connect" mthod for connecting with MySQL database which availbale in the above configurable server
 */
connection.connect ( function ( err ) {

    if ( err ) {

        console.log ( "Oops something went wrong to the Database connectivity...!", err );
    }
    else {

        console.log ( "Database Connected Successfully...!" );
    }
});


/**
 * Export the "connection" object for use in other files
 */
module.exports = connection;