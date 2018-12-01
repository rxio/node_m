console.log("Before");

getUser(1, function (user) {
    console.log(`USER DATA: ${JSON.stringify(user)}`);
});

getRepositories('Jonathan', function(repos) {
    console.log(repos);
});

console.log("After");


function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from the database...")
        callback({id: id, username: "mosh"})
    }, 1500);
}

function getRepositories(username, callback) {
    setTimeout(function() {
        console.log(`Getting repos for ${username}`);
        callback (['repo1', 'repo2', 'repo3']);
    }, 1500);
}