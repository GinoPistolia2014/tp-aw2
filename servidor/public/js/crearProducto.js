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


document.addEventListener('DOMContentLoaded', () => {

    let user = localStorage.getItem("usuario");
    user !== null ? 
        userDinamico.textContent = `Bienvenido/a ${user}` : 
        userDinamico.textContent = "Bienvenido/a";
    
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
    validacion();
    
    ///Envío manual de datos del formulario
    await fetch('/api/v1/productos', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: nombre.value,
            precio: precio.value,
            categoria: categoria.value,
            imagen: imagen.value, /// Campo no obligatorio: Aún falta la implementación de Multer
            descripcion: descripcion.value,
            stock: stock.value,
            talle: talle.value,
            descuento: descuento.value
        })
    });
    createForm.reset();
})


///Validacion

function validacion() {
    
    if (
        nombre.value.trim() !== "" &&
        precio.value.trim() !== "" && Number(precio.value) > 0 &&
        categoria.value.trim() !== "" &&
        descripcion.value.trim() !== "" &&
        stock.value.trim() !== "" && Number(stock.value) > 0 &&
        talle.value.trim() !== ""
    ) {

        if (!(isNaN(precio.value)) && !(isNaN(stock.value))) {

            showMessage('Producto agregado exitosamente.');
        };

    } else {
        showMessage('A excepción de imagen y descuento, todos los campos deben completarse obligatoriamente.', 'error');
    };
};