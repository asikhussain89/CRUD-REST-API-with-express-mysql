const defaultHeader = {
    "Content-Type": "application/json; charset=utf-8"
}

const defaultResponse = {
    "result": "Failed",
    "message": "Oops..! Something went wrong"
}


const sendClientResponse = ( responseObject, status, response = defaultResponse, header = defaultHeader ) => {

    responseObject.header ( header ).status ( status ).send ( response );
}

module.exports = sendClientResponse;