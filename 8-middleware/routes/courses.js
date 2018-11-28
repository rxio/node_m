const Joi = require("joi"); //This module returns a class
const express = require("express");
const router = express.Router();

// This is our makeshift database
const courses = [
	{id: 1, name: 'course 1'},
	{id: 2, name: 'course 2'},
	{id: 3, name: 'course 3'}
];

// This function is used for validation
function validateCourse (course) {
	const schema = {
		name: Joi.string().min(3).required()
	};

	return Joi.validate(course, schema);
}

// This endpoint returns all the objects in the courses array
router.get("/", (req, res) => {
	res.send(courses);
});

router.get("/:id", (req, res) => {
	const course = courses.find( c => c.id === parseInt(req.params.id) );

	if (!course) {
		res.status(404).send("course not found");
		return;
	} 

	res.send(course);
	
});

router.post("/", (req, res) => {
	const result = validateCourse(req.body);

	if (result.error) {
		console.log(result.error.details[0].message);
		res.status(400).send(result.error.details[0].message);
		return;
	} else {
		console.log(result);
	}

	const course = {
		id: courses.length + 1,
		name: req.body.name
	};

	courses.push(course);
	res.send(courses);
});

router.put("/:id", (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id));

	if (!course) {
		return res.status(404).send("Course could not be found");	
	}

	const result = validateCourse(req.body); //result.error === { error } //This is called object destructuring

	if(result.error) return res.status(400).send(result.error.details[0].message);
	

	course.name = req.body.name;
	res.send(course);

});

router.delete("/:id", (req, res) => {
	const courseIndex = courses.findIndex( c => c.id === parseInt(req.params.id) );
	
	if (courseIndex < 0) return res.status(404).send("course not found");

	const course = courses.splice(courseIndex,1);

	res.send(course);
});

module.exports = router;