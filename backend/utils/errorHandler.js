const throwError = (name,message) => {
    const error = new Error();
    error.name = name;
    error.message = message

    throw error;
}

module.exports = throwError;