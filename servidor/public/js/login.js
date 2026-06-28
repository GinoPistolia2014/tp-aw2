import showMessage from './notificaciones.js';

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const loginBtn = document.getElementById("login-btn");
const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', async(ev) => {
    ev.preventDefault();

    if (!email.value || !password.value) {
        showMessage("Por favor, ingrese sus credenciales.", 'error');
        return;
    };

    const datosLogin = {
        email: email.value,
        contrasena: password.value
    };

    try {
        const response = await fetch('/api/v1/usuarios/autenticar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosLogin)
        });

        const data = await response.json();

        if (response.ok) {            
            JSON.stringify(localStorage.setItem('usuario', email.value));
            window.location.href = '/views/panelAdmin.html';
        } else {
            showMessage('Credenciales incorrectas.', 'error');
            console.log(data.error);
        }

    } catch (error) {
        console.log(`Error en la petición: ${error.message}`);
        showMessage('Hubo un problema de conexión con el servidor.', 'error');
    };
});

