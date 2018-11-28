function log (req, res, next) {
	console.log("Logging...");
	next();
	// next() passes control to the next middleware function, otherwise the server will hang 
}

module.exports = log; 