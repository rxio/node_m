const p1 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log('Async operation 1...');
		resolve(1);
		if (false) {
			reject(new Error('An error occured at 1'));
		}
	}, 2000);
});

const p2 = new Promise((resolve, reject) => {
	setTimeout(() => {
		console.log("Async operation 2...");
		resolve(2);
	}, 2000);
});

// This method takes an array of pending promise objects
// and returns an array of all the promises when the promise objects are resolved
// If one promise is rejected, it will return the error instead
Promise.all([p1,p2])
	.then(result => console.log(result))
	.catch(err => console.log(err.message));

// Promise.race([p1, p2]) will do something as soon as the fastest aynch operation completes
