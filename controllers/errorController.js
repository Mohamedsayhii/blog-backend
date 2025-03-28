function errorController(error, req, res, next) {
	console.error(error);

	error.statusCode = error.statusCode || 500;
	error.status = error.status || 'error';

	res.status(error.statusCode).json({
		status: error.statusCode,
		message: error.message,
	});
}

export default errorController;
