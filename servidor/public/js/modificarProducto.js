import showMessage from "./notificaciones.js";

const backToPanel = document.getElementById("backtomainpanel");
const updateForm = document.getElementById("form-modificarproducto");
const productoModificar = document.getElementById("nombreproducto");
const criterio = document.getElementById("criteriomodificar");
const nuevaInformacion = document.getElementById("nuevainfo");
const categorias = document.querySelectorAll(".categorias-lista li");
const userDinamico = document.getElementById("userdinamico");
const picDinamico = document.getElementById("profilepic");
const logoutBtn = document.getElementById("logout-btn");


document.addEventListener('DOMContentLoaded', async() => {
    ////Colocación del User en el encabezado
    const usuarioLogueado = localStorage.getItem("usuario");
    const peticion = await fetch(`/api/v1/usuarios/email/${usuarioLogueado}`);
    const usuario = await peticion.json();
    
    if(usuario != null && usuario != undefined) {
        userDinamico.textContent = `Bienvenido/a ${usuario[0].nombre}`;
        picDinamico.src = `../img/fotosPerfil/${usuario[0].foto}`;
    } else {
        userDinamico.textContent = 'Bienvenido/a';
        picDinamico.src = '../img/fotosPerfil/usuario.png';
    }
    
    ////Activación de categorías del panel lateral
    categorias.forEach(cat => {
        cat.addEventListener("click", () => {
        categorias.forEach(c => c.classList.remove("active-category"));
        cat.classList.add("active-category");
        });
    });
});

updateForm.addEventListener('submit', async(ev) => {

    ev.preventDefault();

    const criterioModificar = document.getElementById("criteriomodificar").value;
    const infoModificar = document.getElementById("nuevainfo").value;

    const peticion = await fetch(`/api/v1/productos/${productoModificar.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            criterio: criterioModificar,
            nuevaInfo: infoModificar
        })
    });

    validacion(peticion.status);
    updateForm.reset();
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

//Validacion

function validacion(statusCode) {
    if (
        productoModificar.value.trim() !== "" &&
        criterio.value.trim() !== "" &&
        nuevaInformacion.value.trim() !== ""
    ) {


            if (statusCode === 401) {
                showMessage(`No tienes la autenticación para modificar un producto.`, 'error');
            } else if (statusCode === 500) {
                showMessage(`Error interno del servidor al modificar el producto.`, 'error');
            } else {
                showMessage('Producto modificado exitosamente.');
            }
      

    } else {
        showMessage('Todos los campos deben llenarse obligatoriamente.', 'error');
    };
};