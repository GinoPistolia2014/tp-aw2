import showMessage from "./notificaciones.js";

const backToPanel = document.getElementById("backtomainpanel");
const deleteForm = document.getElementById("form-eliminarproducto");
const idEliminar = document.getElementById("deleteinfo");
const categorias = document.querySelectorAll(".categorias-lista li");
const userDinamico = document.getElementById("userdinamico");
const picDinamico = document.getElementById("profilepic");
const logoutBtn = document.getElementById("logout-btn");

document.addEventListener('DOMContentLoaded', async() => {

    const usuarioLogueado = localStorage.getItem("usuario");
    const peticion = await fetch(`/api/v1/usuarios/email/${usuarioLogueado}`);
    const usuario = await peticion.json();
    
    if(usuario != null && usuario != undefined) {
        userDinamico.textContent = `Bienvenido/a ${usuario[0].nombre}`;
        picDinamico.src = `/img/fotosPerfil/${usuario[0].foto}`;
    } else {
        userDinamico.textContent = 'Bienvenido/a';
        picDinamico.src = '/img/fotosPerfil/usuario.png';
    }
    
    categorias.forEach(cat => {
        cat.addEventListener("click", () => {
        categorias.forEach(c => c.classList.remove("active-category"));
        cat.classList.add("active-category");
        });
    });
});

deleteForm.addEventListener('submit', async(ev) => {

    ev.preventDefault();

    const peticion = await fetch(`/api/v1/productos/${idEliminar.value}`, {
        method: 'DELETE'
    });

    validacion(peticion.status);
    deleteForm.reset();
});

backToPanel.addEventListener('click', () => {
    window.location.href = '/views/panelAdmin.html'
});

logoutBtn.addEventListener('click', async() => {
    const peticion = await fetch('/api/v1/usuarios/cerrarSesion');

    if (peticion.status != 200) {
        showMessage('Error al cerrar sesión', 'error');
    } else {
        localStorage.removeItem('usuario');
        window.location.href = '/views/login.html';
    };
});

///Validación

function validacion(statusCode) {
    if (idEliminar.value.trim() !== "" && Number(idEliminar.value) > 0) {

        if (!(isNaN(idEliminar.value))) {

            if (statusCode === 401) {
                showMessage('No tienes la autentiacación para eliminar un producto.', 'error');
            } else if (statusCode === 500) {
                showMessage('Ocurrió un error al eliminar el producto', 'error');
            } else {
                showMessage('Producto eliminado exitosamente.');
            }
        };

    } else {
        showMessage('Por favor ingrese un número de ID válido.', 'error');
    };
};

