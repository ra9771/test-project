
function displayProfile(profile) {
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `
        <img src="${profile.avatar_url}" alt="${profile.login}" width="100">
        <h2>${profile.name}</h2>
        <p>${profile.bio || 'No bio available.'}</p>
        <p>Followers: ${profile.followers}</p>
        <p>Following: ${profile.following}</p>
        <p>Public Repositories: ${profile.public_repos}</p>
    `
}

function displayError(message) {
    const profileElement = document.getElementById('profile');
    profileElement.innerHTML = `<p style="color: red;">${message}</p>`;
}


// Add a function to update the perPage variable when the select element changes
function updatePerPage() {
    perPage = parseInt(document.getElementById('perPage').value, 10);
}
// Add a global variable to store the repositories per page
let perPage = 10;

// Update the getProfile function to use the perPage variable
function getProfile() {
    const username = document.getElementById('username').value;

    if (username.trim() !== '') {
        fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}`)
            .then(response => response.json())
            .then(repositories => {
                displayProfile(repositories);
            })
            .catch(error => {
                console.error('Error fetching GitHub repositories:', error);
                displayError('Error fetching GitHub repositories. Please try again.');
            });
    } else {
        displayError('Please enter a valid GitHub username.');
    }
}

