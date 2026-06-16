import showMessage from "./notificaciones.js";

const form = document.getElementById("register-form");

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const contrasena = document.getElementById("contrasena").value;

    if (!validacionCampos(nombre, apellido, email, username, contrasena)) {
        return;
    };

    if (!(await validacionUsuarioExistente(username, email))) {
        return;
    };

    const datos = new FormData(form);
    console.log('front: ' + datos)

    await fetch('/api/v1/usuarios', {
        method: 'POST',
        body: datos
    });

    showMessage('Usuario registrado exitosamente');
    form.reset();
});


function validacionCampos(nombre, apellido, email, username, contrasena) {
    if (
        nombre.trim() !== "" &&
        apellido.trim() !== "" &&
        email.trim() !== "" &&
        username.trim() !== "" &&
        contrasena.trim() !== ""
    ) {
        return true
    } else {
        showMessage('Por favor rellene todos los campos', 'error');
        return false
    };
};

async function validacionUsuarioExistente(username, email){
    const responseUsername = await fetch(`/api/v1/usuarios/username/${username}`);
    const peticionUsername = await responseUsername.json();

    const responseEmail = await fetch(`/api/v1/usuarios/email/${email}`);
    const peticionEmail = await responseEmail.json();


    if (peticionUsername.length > 0) {
        showMessage('Este nombre de usuario ya existe', 'error');
        return false;
    }

    if (peticionEmail.length > 0) {
        showMessage('Este correo electrónico ya está registrado', 'error');
        return false;
    }

    return true;
};