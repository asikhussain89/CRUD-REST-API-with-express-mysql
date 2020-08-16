var express = require ( "express" );
var mysql = require ( "mysql" );

var router = express.Router();

var dbConnect = require ( "../DatabaseConnection/db_connection" );

var clientResponseSend = require ( "../ClientResponseSend" );


var userTableName = "details";

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


router.all ( "/", function ( req, res ) {

    let response = {
        "result": "Failed",
        "message": "Invalid URL or Method...!"
    };

    clientResponseSend ( res, 405, response );
});



module.exports = router;