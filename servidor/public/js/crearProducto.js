import showMessage from './notificaciones.js';

const backToPanel = document.getElementById("backtomainpanel");
const createForm = document.getElementById("form-crearproducto");
const nombre = document.getElementById("nombre");
const precio = document.getElementById("precio");
const categoria = document.getElementById("categoria");
const imagen = document.getElementById("imagen");
const descripcion = document.getElementById("descripcion");
const stock = document.getElementById("stock");
const talle = document.getElementById("talle");
const descuento = document.getElementById("descuento");
const categorias = document.querySelectorAll(".categorias-lista li");
const userDinamico = document.getElementById("userdinamico");
const logoutBtn = document.getElementById("logout-btn");



document.addEventListener('DOMContentLoaded', async() => {

    const usuarioLogueado = localStorage.getItem("usuario");
    const peticion = await fetch(`/api/v1/usuarios/email/${usuarioLogueado}`);
    const usuario = await peticion.json();

    usuario != null && usuario != undefined ? 
        userDinamico.textContent = `Bienvenido/a ${usuario[0].nombre}` :
        userDinamico.textContent = 'Bienvenido/a';
    
    categorias.forEach(cat => {
        cat.addEventListener("click", () => {
        categorias.forEach(c => c.classList.remove("active-category"));
        cat.classList.add("active-category");
        });
    });
});

backToPanel.addEventListener('click', () => {
    window.location.href = '/views/panelAdmin.html';
});

createForm.addEventListener('submit', async(ev) => {

    ev.preventDefault();
    const datos = new FormData(ev.target)
    
    ///Envío manual de datos del formulario
    const peticion = await fetch('/api/v1/productos', {
        method: 'POST',
        body: datos
    });

    validacion(peticion.status);
    createForm.reset();
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


///Validacion

function validacion(statusCode) {
    
    if (
        nombre.value.trim() !== "" &&
        precio.value.trim() !== "" && Number(precio.value) > 0 &&
        categoria.value.trim() !== "" &&
        descripcion.value.trim() !== "" &&
        stock.value.trim() !== "" && Number(stock.value) > 0 &&
        talle.value.trim() !== ""
    ) {

        if (!(isNaN(precio.value)) && !(isNaN(stock.value))) {

            if (statusCode === 401) {
                showMessage(`No tienes la autenticación para realizar esta acción.`, 'error');
            } else if (statusCode === 500) {
                showMessage(`Error interno del servidor al agregar el producto.`, 'error');
            } else {
                showMessage('Producto agregado exitosamente.');
            };

        } else {
            showMessage('Por favor, ingrese valores válidos.', 'error');
        };

    } else {
        showMessage('A excepción de imagen y descuento, todos los campos deben completarse obligatoriamente.', 'error');
    };
};