function errorHandler(error, req, res, next) {
    console.log(error);
    let statusCode, message
    switch (error.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            statusCode = 400
            message = error.errors[0]?.message || "Username already exists";
            break;

        case "Username is missing":
            statusCode = 400
            message = "Username is missing";
            break;

        case "Password is missing":
            statusCode = 400
            message = "Password is missing";
            break;

        case "Invalid username/password":
            statusCode = 401
            message = "Invalid username/password";
            break;

        case "Unauthenticated":
        case "JsonWebTokenError":
            statusCode = 401
            message = "Unauthenticated";
            break;

        case "Forbidden Error":
            statusCode = 403
            message = "Forbidden Error";
            break;

        case "NotFound":
            statusCode = 404
            message = error.message ?? "Data Not Found";
            break;

        default:
            statusCode = 500;
            message = "Internal Error Server";
            break;
    }
    res.status(statusCode).json({ message })
}

module.exports = errorHandler