import showMessage from "./notificaciones.js";

const backToPanel = document.getElementById("backtomainpanel");
const deleteForm = document.getElementById("form-eliminarproducto");
const idEliminar = document.getElementById("deleteinfo");
const categorias = document.querySelectorAll(".categorias-lista li");


document.addEventListener('DOMContentLoaded', () => {
    
    categorias.forEach(cat => {
        cat.addEventListener("click", () => {
        categorias.forEach(c => c.classList.remove("active-category"));
        cat.classList.add("active-category");
        });
    });
});

if (deleteForm) {
    deleteForm.addEventListener('submit', async(ev) => {

        ev.preventDefault();
        validacion();

        await fetch(`/api/v1/productos/${idEliminar.value}`, {
            method: 'DELETE'
        });
        deleteForm.reset();
    });
};

backToPanel.addEventListener('click', () => {
    window.location.href = '/views/panelAdmin.html'
});

///Validación

function validacion() {
    if (
        idEliminar.value.trim() !== "" && Number(idEliminar.value) > 0 ) {

        if (!(isNaN(idEliminar.value))) {
            showMessage('Producto eliminado exitosamente.');
        };

    } else {
        showMessage('Por favor ingrese un número de ID válido.', 'error');
    };
};

