//Aync and Await helps you write asynchronous code like synchronous code

console.log('Before');

async function displayCommits() {
	try {
		const user = await getUser(1);
		const repos = await getRepositories(user.gitHubUsername);
		const commits = await getCommits(repos);
		console.log(commits);
	}
	catch (err) {
		console.log('Error message:', err.message);
	}
}  
displayCommits();

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Reading a user from the database');
      resolve({ id: id, gitHubUsername: 'mosh' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API...');
      resolve(['repo1', 'repo2', 'repo3']);
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API again...');
      resolve(['commit']);
    }, 2000);    
  });
}