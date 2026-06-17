const mainContainer = document.querySelector(".panelsection");
const tasksOption = document.getElementById("tareas");
const ordersOption = document.getElementById("ordenes");
const stockOption = document.getElementById("inventario");
const categorias = document.querySelectorAll(".categorias-lista li");
const userDinamico = document.getElementById("userdinamico");
const logoutBtn = document.getElementById("logout-btn");

document.addEventListener('DOMContentLoaded', () => {

    let user = localStorage.getItem("usuario");

    if (user === null) {
        userDinamico.textContent = "Bienvenido/a";
    } else {
        userDinamico.textContent = `Bienvenido/a ${user}` || "";
    };

    categorias.forEach(cat => {
    cat.addEventListener("click", () => {
      categorias.forEach(c => c.classList.remove("active-category"));
      cat.classList.add("active-category");
    });
  });
})

tasksOption.addEventListener('click', () => {

    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    };

    if (!(mainContainer.classList.contains("ordenes")) && (!(mainContainer.classList.contains("inventario")))) {
        mainContainer.classList.add("tareas");
    };

    if (mainContainer.classList.contains("ordenes") || mainContainer.classList.contains("inventario")) {
        mainContainer.classList.replace("ordenes", "tareas");
        mainContainer.classList.replace("inventario", "tareas");
    };
    toggleContent();
});

ordersOption.addEventListener('click', () => {

    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    };

    if (!(mainContainer.classList.contains("tareas")) && (!(mainContainer.classList.contains("inventario")))) {
        mainContainer.classList.add("ordenes");
    };

    if (mainContainer.classList.contains("tareas") || mainContainer.classList.contains("inventario")) {
        mainContainer.classList.replace("tareas", "ordenes")
        mainContainer.classList.replace("inventario", "ordenes");
    };
    toggleContent();
});

stockOption.addEventListener('click', () => {

    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    };

    if (!(mainContainer.classList.contains("ordenes")) && (!(mainContainer.classList.contains("tareas")))) {
        mainContainer.classList.add("inventario");
    };

    if (mainContainer.classList.contains("ordenes") || mainContainer.classList.contains("tareas")) {
        mainContainer.classList.replace("ordenes", "inventario")
        mainContainer.classList.replace("tareas", "inventario");
    };
    toggleContent();
});

async function toggleContent() {
    if (mainContainer.classList.contains("tareas")) {
        mainContainer.innerHTML = `
            <h2 class="paneltitle">Tareas</h2>
            <div class="taskscontainer">

                <article id="crear">
                    <h3>Crear Productos</h3>
                    <p>Cree productos que estén disponibles para la venta</p>
                </article>

                <article id="modificar">
                    <h3>Modificar productos</h3>
                    <p>Actualice los datos de un determinado artículo</p>
                </article>

                <article id="eliminar">
                    <h3>Eliminar Productos</h3>
                    <p>Dé de baja un artículo específico por renovación o falta de stock</p>
                </article>
                
            </div>
        `

        const createBtn = document.getElementById("crear");
        const updateBtn = document.getElementById("modificar");
        const deleteBtn = document.getElementById("eliminar");

        if (mainContainer.contains(createBtn)) {
            createBtn.addEventListener('click', () => {
                window.location.href = '/views/crearProducto.html'
            })
        };

        if (mainContainer.contains(updateBtn)) {
            updateBtn.addEventListener('click', () => {
                window.location.href = '/views/modificarProducto.html'
            })
        };
        
        if (mainContainer.contains(deleteBtn)) {
            deleteBtn.addEventListener('click', () => {
                window.location.href = '/views/eliminarProducto.html'
            })
        };

    } else if (mainContainer.classList.contains("ordenes")) {
        const peticion = await fetch('/api/v1/ordenes');
        const ordenes = await peticion.json();
        while (!ordenes) {
            mainContainer.innerHTML = `Cargando...`
        }
        let paginaActual = 1;
        const headers = ['Cliente', 'Dirección', 'Método de Pago', 'Total']
        const campos = ['nombreCompleto', 'direccion', 'metodoPago', 'total']
        renderizarObjetos(ordenes, paginaActual, 'Órdenes', headers, campos);

    } else if (mainContainer.classList.contains("inventario")) {
        const peticion = await fetch('/api/v1/productos');
        const ordenes = await peticion.json();
        let paginaActual = 1;
        const headers = ['Nombre', 'Categoria', 'Unidades Disponibles', 'Precio por Unidad']
        const campos = ['nombre', 'categoria', 'stock', 'precio']
        renderizarObjetos(ordenes, paginaActual, 'Inventario', headers, campos);
    }
};

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("usuario");
});

function renderizarObjetos(datos, paginaActual, titulo, headers, campos) {

    while (!datos) {
        mainContainer.innerHTML = `Cargando...`
    }
    const elementosPorPagina = 5;

    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;

    const datosPagina = datos.slice(inicio, fin);

    mainContainer.innerHTML = `
        <h2 class="paneltitle">${titulo}</h2>

        <div class="rendercontainer">
            <div class="headercontainer">
                ${headers.map(header => `
                    <h3>${header}</h3>
                `).join('')}
            </div>

            <div class="itemscontainer">
                ${datosPagina.map(item => `
                    <div class="itemscard">
                        ${campos.map(campo => `
                            <p>${item[campo]}</p>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>

        <div class="pagination">
                 <span id="prev">
                     ←
               </span>

                 <span>${paginaActual}</span>

                 <span id="next"
                >
                     → 
                 </span>
             </div>
        </div>
    `;

     document.getElementById("prev")?.addEventListener("click", () => {
         if (paginaActual > 1) {
            paginaActual--;

            if (titulo === 'Órdenes') {
                renderizarObjetos(datos, paginaActual, 'Órdenes', headers, campos);
            }

            if (titulo === 'Inventario') {
                renderizarObjetos(datos, paginaActual, 'Inventario', headers, campos);
            }
        }
     });

     document.getElementById("next")?.addEventListener("click", () => {
        if (fin < datos.length) {
            paginaActual++;

            if (titulo === 'Órdenes') {
                renderizarObjetos(datos, paginaActual, 'Órdenes', headers, campos);
            };

            if (titulo === 'Inventario') {
                renderizarObjetos(datos, paginaActual, 'Inventario', headers, campos);
            };   
        };    
     });
};