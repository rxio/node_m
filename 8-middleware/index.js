//Error on line 46 - 47. Custom middleware functions DO NOT console.log anything to the console

const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const config = require("config");

//Setup debuggers with " export DEBUG=app:startup,app:db "
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
//Type " export DEBUG= " to remove debuggers 

const authenticator = require("./middleware/auth");
const logger = require("./middleware/logger");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

console.log(`Application Name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
// console.log(`Mail Server: ${config.get('mail.password')}`);
// Set password " with export app_password= "

// This logs the environment we are currently in
console.log(`process.env.NODE_ENV: ${process.env.NODE_ENV}`); //returns undefined if environment not set
console.log(`app environment: ${app.get("env")}`);
// Set environment with: export NODE_ENV=production/development

// Calling express.json() returns a piece of middleware
// app.use() uses that middleware in the request processing pipeline 
app.use(express.json());
app.use(express.urlencoded({extended:true})); //No idea what {extended:true} is used for
app.use(express.static("public")); //Looks into the public folder
app.use(helmet());

if(app.get("env") === 'development') {
	app.use(morgan("tiny"));
	startupDebugger("Morgan enabled...");
}

//Make-believe db work
dbDebugger("Connected to the database...");

// Create a custom middleware function
app.use(logger); //Imported on line 2
app.use(authenticator); //Imported on line 3

app.use("/api/courses", courses);
app.use("/", home);

const port = process.env.PORT || 3000;

app.listen(port, function(){
	console.log(`Listening on port ${port}...`);
});