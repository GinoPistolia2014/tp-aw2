import showMessage from './notificaciones.js';

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.getElementById("login-btn");


loginBtn.addEventListener('click', (e) => {

    if (email.value !== "" && password.value !== "") {
        let username = email.value.split("@")[0];
        localStorage.setItem('usuario', username)
    } else {
        e.preventDefault();
        showMessage('Por favor, ingrese sus credenciales', 'error');
    } 
});

