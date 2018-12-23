console.log('Before');

getUser(1)
  .then(user => getRepositories(user))
  .then(repos => getCommits(repos))
  .then(commit => console.log(commit))
  .catch(err => console.log('Error', err.message));

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