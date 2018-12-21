console.log("Before");

getUser(1, printUser);

console.log("After");

function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from the database...")
        callback({id: id, username: "mosh"})
    }, 1500);
}

function getRepositories(username, callback) {
    setTimeout(function() {
        console.log(`Getting repos for ${username}.`);
        callback (['repo1', 'repo2', 'repo3']);
    }, 1500);
}

//printUser(user) is referenced as a callback on line 3
function printUser(user) {
    console.log(`USER DATA: ${JSON.stringify(user)}`);
    getRepositories(user.username, printRepositories)
}
//printRepositories(repos) is referenced as a callback on line 24
function printRepositories(repos) {
    console.log(repos);
}