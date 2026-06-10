import showMessage from "./notificaciones.js";

const backToPanel = document.getElementById("backtomainpanel");
const updateForm = document.getElementById("form-modificarproducto");
const idModificar = document.getElementById("idproducto");
const criterio = document.getElementById("criteriomodificar");
const nuevaInformacion = document.getElementById("nuevainfo");
const categorias = document.querySelectorAll(".categorias-lista li");
const userDinamico = document.getElementById("userdinamico");


document.addEventListener('DOMContentLoaded', () => {
    ////Colocación del User en el encabezado
    let user = localStorage.getItem("usuario");
    user !== null ? 
        userDinamico.textContent = `Bienvenido/a ${user}` : 
        userDinamico.textContent = "Bienvenido/a";
    
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
    validacion();

    await fetch(`/api/v1/productos/${idModificar.value}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            criterio: criterioModificar,
            nuevaInfo: infoModificar
        })
    });
    updateForm.reset()
});

backToPanel.addEventListener('click', () => {
    window.location.href = '/views/panelAdmin.html'
});

//Validacion

function validacion() {
    if (
        idModificar.value.trim() !== "" && Number(idModificar.value) > 0 &&
        criterio.value.trim() !== "" &&
        nuevaInformacion.value.trim() !== ""
    ) {

        if (!(isNaN(idModificar.value))) {
            showMessage('Producto modificado exitosamente.');
        };

    } else {
        showMessage('Todos los campos deben llenarse obligatoriamente.', 'error');
    };
};