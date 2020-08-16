var express = require ( "express" );
var mysql = require ( "mysql" );


/**
 * Create router object for create router method for client HTTP client 
 */
var router = express.Router();


/**
 * Include the "db_connection" custom module
 */
var dbConnect = require ( "../DatabaseConnection/db_connection" );


/**
 * Include the "ClientResponseSend" custom module
 */
var clientResponseSend = require ( "../ClientResponseSend" );


/**
 * Set the database table name for use in MySQL query
 */
var userTableName = "details";


/**
 * Create router "GET" method
 * This method handle the HTTP client request with the "/user" path
 * The below method will send all users list as json
 */
router.get ( "/", function ( req, res ) {
    
    var data = { "result": "Success", "users": [] };
    
    var query = `SELECT * FROM ${userTableName}`;

    dbConnect.query ( query, function ( err, result ) {
        
        if ( err ) {
            
            data.result = "Failed";

            clientResponseSend ( res, 400, data );
        }

        for ( let i = 0; i < result.length; i++ ) {
            
            data.users.push ( { "name": result[i].name, "age": result[i].age } );
        }
        
        clientResponseSend ( res, 200, data );
    });
})


/**
 * Create router "GET" method
 * This method handle the HTTP client request with the "/user/{id}" path
 * This method will receive user id and send information about that user
 */
router.get ( "/:id", function ( req, res ) {

    var data = { "result": "Success", "users": [] };
    
    var query = `SELECT * FROM ${userTableName} WHERE id = ?`;
    
    dbConnect.query ( query, [ req.params.id ], function ( err, result ) {

        if ( err ) {
            console.log ( "Error : ", err );
            data.result = "Failed";

            clientResponseSend ( res, 400, data );
        }
        
        for ( let i = 0; i < result.length; i++ ) {
        
            data.users.push ( { "name": result[i].name, "age": result[i].age } );
        }
        
        var status = 404;
        if ( data.users.length > 0 )
            status = 200;
        
        clientResponseSend ( res, status, data );
    });
});


/**
 * Create router "POST" method
 * This method handle the HTTP client request with the "/user" path
 * The below method will receive user information and created one new record in the table in MySQL database
 */
router.post ( "/", function ( req, res ) {

    var detailsArr = [];

    for ( let key in req.body ) {

        detailsArr.push ( req.body[key] );
    }
    var values = [ detailsArr ];
    
    var query = `INSERT INTO ${userTableName} ( name, age ) VALUES ?`;

    dbConnect.query ( query, [ values ] , function ( err, result ) {

        if ( err )
            clientResponseSend ( res, 400 );
        
        response = {
            "result": "Success",
            "message": "User has been created successfully...!"
        };
        
        clientResponseSend ( res, 201, response );
    });
});


/**
 * Create router "PUT" method
 * This method handle the HTTP client request with the "/user/{id}" path
 * The below method will receive information about existing user id and updated with this information
 */
router.put ( "/:id", function ( req, res ) {

    var query = `UPDATE ${userTableName} SET name = ${mysql.escape ( req.body.name )}, age = ${mysql.escape ( req.body.age )} WHERE id = ${req.params.id}`;
    
    dbConnect.query ( query, function ( err, result ) {

        if ( err )
            clientResponseSend ( res, 400 );
        
        response = {
            "result": "Success",
            "message": "User has been updated successfully...!"
        };
        
        clientResponseSend ( res, 200, response );
    });
});


/**
 * Create router "DELETE" method
 * This method handle the HTTP client request with the "/user/{id}" path
 * The below method will receive user id and delete that record from the table in MySQL database
 */
router.delete ( "/:id", function ( req, res ) {

    var query = `DELETE from ${userTableName} WHERE id = ${req.params.id}`;
    
    dbConnect.query ( query, function ( err, result ) {

        if ( err )
            clientResponseSend ( res, 400 );
        
        let response = {
            "result": "Success",
            "message": "User has been deleted successfully...!"
        };

        clientResponseSend ( res, 200, response );
    });
});


/**
 * Create router all methods except the above method
 * This method handle the HTTP client request with the "/user" path
 */
router.all ( "/", function ( req, res ) {

    let response = {
        "result": "Failed",
        "message": "Invalid URL or Method...!"
    };

    clientResponseSend ( res, 405, response );
});


/**
 * Export the router object for use in other files
 */
module.exports = router;