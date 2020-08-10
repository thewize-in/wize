const signOutBtn = document.querySelector('#signOut');
const signInBtn = document.querySelector('#signIn');

signInBtn.addEventListener('click', onSignIn);
function onSignIn(googleUser) {
    document.querySelector('pre').innerHTML = googleUser.getAuthResponse().id_token;
    axios
        .post(
            'http://localhost:3000/login',
            {
                googleAuthToken: googleUser.getAuthResponse().id_token,
            },
            { withCredentials: true },
        )
        .then((data) => {});
}
async function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    await axios.post('http://localhost:3000/logout', { withCredentials: true });
}
