const API_URL = "/contactos";

let contactos = [];

let contactoEliminarId = null;


/* =========================
   INICIALIZACIÓN
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        configurarNavegacion();

        configurarEventos();

        cargarContactos();

    }
);


/* =========================
   CARGAR CONTACTOS
========================= */

async function cargarContactos() {

    try {

        const response =
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "No se pudieron obtener los contactos"
            );

        }


        const data =
            await response.json();


        /*
            Nos aseguramos de que la
            respuesta sea un arreglo.
        */

        contactos =
            Array.isArray(data)
                ? data
                : [];


        console.log(
            "CONTACTOS OBTENIDOS:",
            contactos
        );


        renderizarContactos();

        actualizarDashboard();


    } catch (error) {

        console.error(
            "Error cargando contactos:",
            error
        );


        contactos = [];


        renderizarContactos();

        actualizarDashboard();


        mostrarNotificacion(
            error.message,
            true
        );

    }

}


/* =========================
   RENDERIZAR CONTACTOS
========================= */

function renderizarContactos(
    lista = contactos
) {

    const tabla =
        document.getElementById(
            "tablaContactos"
        );


    if (!tabla) {
        return;
    }


    tabla.innerHTML = "";


    if (
        !Array.isArray(lista) ||
        lista.length === 0
    ) {

        tabla.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align: center;
                        padding: 30px;
                    "
                >

                    📭 No hay contactos registrados

                </td>

            </tr>

        `;

        return;

    }


    lista.forEach(
        contacto => {

            const fila =
                document.createElement(
                    "tr"
                );


            fila.innerHTML = `

                <td>
                    ${contacto.id}
                </td>


                <td>

                    <strong>
                        ${escapeHTML(
                            contacto.nombre
                        )}
                    </strong>

                </td>


                <td>
                    ${escapeHTML(
                        contacto.telefono
                    )}
                </td>


                <td>
                    ${escapeHTML(
                        contacto.correo
                    )}
                </td>


                <td>
                    ${escapeHTML(
                        contacto.empresa ||
                        "-"
                    )}
                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="edit-button"
                            data-id="${contacto.id}"
                            title="Editar"
                        >
                            ✏️
                        </button>


                        <button
                            class="delete-button"
                            data-id="${contacto.id}"
                            title="Eliminar"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            /*
                Botón editar
            */

            const botonEditar =
                fila.querySelector(
                    ".edit-button"
                );


            botonEditar.addEventListener(
                "click",
                () => {

                    abrirEditar(
                        contacto.id
                    );

                }
            );


            /*
                Botón eliminar
            */

            const botonEliminar =
                fila.querySelector(
                    ".delete-button"
                );


            botonEliminar.addEventListener(
                "click",
                () => {

                    abrirEliminar(
                        contacto.id
                    );

                }
            );


            tabla.appendChild(
                fila
            );

        }
    );

}


/* =========================
   DASHBOARD
========================= */

function actualizarDashboard() {

    const totalContactos =
        document.getElementById(
            "totalContactos"
        );


    if (totalContactos) {

        totalContactos.textContent =
            contactos.length;

    }


    const empresas =
        new Set(

            contactos
                .map(
                    contacto =>
                        contacto.empresa
                )
                .filter(Boolean)

        );


    const totalEmpresas =
        document.getElementById(
            "totalEmpresas"
        );


    if (totalEmpresas) {

        totalEmpresas.textContent =
            empresas.size;

    }


    mostrarContactosRecientes();

}


/* =========================
   CONTACTOS RECIENTES
========================= */

function mostrarContactosRecientes() {

    const contenedor =
        document.getElementById(
            "contactosRecientes"
        );


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";


    const ultimos =
        [...contactos]
            .slice(-5)
            .reverse();


    if (
        ultimos.length === 0
    ) {

        contenedor.innerHTML = `

            <div class="recent-item">

                <span>
                    📭 No hay contactos registrados.
                </span>

            </div>

        `;

        return;

    }


    ultimos.forEach(
        contacto => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "recent-item";


            item.innerHTML = `

                <div>

                    <div class="recent-name">

                        ${escapeHTML(
                            contacto.nombre
                        )}

                    </div>


                    <div class="recent-company">

                        ${escapeHTML(
                            contacto.empresa ||
                            "Sin empresa"
                        )}

                    </div>

                </div>


                <span>

                    ${escapeHTML(
                        contacto.telefono
                    )}

                </span>

            `;


            contenedor.appendChild(
                item
            );

        }
    );

}


/* =========================
   NAVEGACIÓN
========================= */

function configurarNavegacion() {

    const botones =
        document.querySelectorAll(
            ".menu-item"
        );


    botones.forEach(
        boton => {

            boton.addEventListener(
                "click",
                () => {

                    const seccion =
                        boton.dataset.section;


                    cambiarSeccion(
                        seccion
                    );

                }
            );

        }
    );


    const btnVerContactos =
        document.getElementById(
            "btnVerContactos"
        );


    if (btnVerContactos) {

        btnVerContactos.addEventListener(
            "click",
            () => {

                cambiarSeccion(
                    "contactos"
                );

            }
        );

    }

}


/* =========================
   CAMBIAR SECCIÓN
========================= */

function cambiarSeccion(
    nombreSeccion
) {

    const secciones =
        document.querySelectorAll(
            ".section"
        );


    secciones.forEach(
        seccion => {

            seccion.classList.remove(
                "active-section"
            );

        }
    );


    const seccion =
        document.getElementById(
            nombreSeccion
        );


    if (!seccion) {
        return;
    }


    seccion.classList.add(
        "active-section"
    );


    const botones =
        document.querySelectorAll(
            ".menu-item"
        );


    botones.forEach(
        boton => {

            boton.classList.remove(
                "active"
            );


            if (
                boton.dataset.section ===
                nombreSeccion
            ) {

                boton.classList.add(
                    "active"
                );

            }

        }
    );


    actualizarTitulo(
        nombreSeccion
    );


    if (
        nombreSeccion ===
        "inicio"
    ) {

        actualizarDashboard();

    }


    if (
        nombreSeccion ===
        "contactos"
    ) {

        renderizarContactos();

    }

}


/* =========================
   ACTUALIZAR TÍTULO
========================= */

function actualizarTitulo(
    nombreSeccion
) {

    const titulo =
        document.getElementById(
            "tituloPagina"
        );


    const subtitulo =
        document.getElementById(
            "subtituloPagina"
        );


    if (
        !titulo ||
        !subtitulo
    ) {

        return;

    }


    if (
        nombreSeccion ===
        "inicio"
    ) {

        titulo.textContent =
            "Inicio";


        subtitulo.textContent =
            "Resumen de tu agenda";

    }


    else if (
        nombreSeccion ===
        "contactos"
    ) {

        titulo.textContent =
            "Contactos";


        subtitulo.textContent =
            "Administra todos tus contactos";

    }

}


/* =========================
   EVENTOS
========================= */

function configurarEventos() {

    /*
        Nuevo contacto
    */

    const btnNuevoContacto =
        document.getElementById(
            "btnNuevoContacto"
        );


    if (btnNuevoContacto) {

        btnNuevoContacto.addEventListener(
            "click",
            abrirNuevo
        );

    }


    const btnNuevoDesdeInicio =
        document.getElementById(
            "btnNuevoDesdeInicio"
        );


    if (btnNuevoDesdeInicio) {

        btnNuevoDesdeInicio.addEventListener(
            "click",
            abrirNuevo
        );

    }


    /*
        Cerrar modal
    */

    const cerrarModal =
        document.getElementById(
            "cerrarModal"
        );


    if (cerrarModal) {

        cerrarModal.addEventListener(
            "click",
            cerrarModalContacto
        );

    }


    const cancelarModal =
        document.getElementById(
            "cancelarModal"
        );


    if (cancelarModal) {

        cancelarModal.addEventListener(
            "click",
            cerrarModalContacto
        );

    }


    /*
        Formulario
    */

    const formulario =
        document.getElementById(
            "contactoForm"
        );


    if (formulario) {

        formulario.addEventListener(
            "submit",
            guardarContacto
        );

    }


    /*
        Eliminar
    */

    const cancelarEliminar =
        document.getElementById(
            "cancelarEliminar"
        );


    if (cancelarEliminar) {

        cancelarEliminar.addEventListener(
            "click",
            cerrarEliminar
        );

    }


    const confirmarEliminar =
        document.getElementById(
            "confirmarEliminar"
        );


    if (confirmarEliminar) {

        confirmarEliminar.addEventListener(
            "click",
            eliminarContacto
        );

    }


    const cerrarModalEliminar =
        document.getElementById(
            "cerrarModalEliminar"
        );


    if (cerrarModalEliminar) {

        cerrarModalEliminar.addEventListener(
            "click",
            cerrarEliminar
        );

    }


    /*
        Buscador
    */

    const buscarContacto =
        document.getElementById(
            "buscarContacto"
        );


    if (buscarContacto) {

        buscarContacto.addEventListener(
            "input",
            buscarContactos
        );

    }


    /*
        Cerrar modal haciendo
        click fuera
    */

    const modalContacto =
        document.getElementById(
            "modalContacto"
        );


    if (modalContacto) {

        modalContacto.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalContacto
                ) {

                    cerrarModalContacto();

                }

            }
        );

    }


    const modalEliminar =
        document.getElementById(
            "modalEliminar"
        );


    if (modalEliminar) {

        modalEliminar.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    modalEliminar
                ) {

                    cerrarEliminar();

                }

            }
        );

    }

}


/* =========================
   NUEVO CONTACTO
========================= */

function abrirNuevo() {

    const formulario =
        document.getElementById(
            "contactoForm"
        );


    if (!formulario) {
        return;
    }


    formulario.reset();


    document
        .getElementById(
            "contactoId"
        )
        .value = "";


    document
        .getElementById(
            "modalTitulo"
        )
        .textContent =
        "Nuevo contacto";


    document
        .getElementById(
            "modalMensaje"
        )
        .textContent =
        "";


    document
        .getElementById(
            "modalContacto"
        )
        .classList.add(
            "show"
        );

}


/* =========================
   EDITAR CONTACTO
========================= */

function abrirEditar(id) {

    const contacto =
        contactos.find(
            contacto =>
                Number(contacto.id) ===
                Number(id)
        );


    if (!contacto) {

        mostrarNotificacion(
            "Contacto no encontrado",
            true
        );

        return;

    }


    document
        .getElementById(
            "contactoId"
        )
        .value =
        contacto.id;


    document
        .getElementById(
            "nombre"
        )
        .value =
        contacto.nombre || "";


    document
        .getElementById(
            "telefono"
        )
        .value =
        contacto.telefono || "";


    document
        .getElementById(
            "correo"
        )
        .value =
        contacto.correo || "";


    document
        .getElementById(
            "empresa"
        )
        .value =
        contacto.empresa || "";


    document
        .getElementById(
            "modalTitulo"
        )
        .textContent =
        "Editar contacto";


    document
        .getElementById(
            "modalMensaje"
        )
        .textContent =
        "";


    document
        .getElementById(
            "modalContacto"
        )
        .classList.add(
            "show"
        );

}


/* =========================
   GUARDAR CONTACTO
========================= */

async function guardarContacto(
    event
) {

    event.preventDefault();


    const id =
        document
            .getElementById(
                "contactoId"
            )
            .value;


    const contacto = {

        nombre:
            document
                .getElementById(
                    "nombre"
                )
                .value
                .trim(),


        telefono:
            document
                .getElementById(
                    "telefono"
                )
                .value
                .trim(),


        correo:
            document
                .getElementById(
                    "correo"
                )
                .value
                .trim(),


        empresa:
            document
                .getElementById(
                    "empresa"
                )
                .value
                .trim()

    };


    try {

        let response;


        if (id) {

            response =
                await fetch(
                    `${API_URL}/${id}`,
                    {

                        method:
                            "PUT",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                contacto
                            )

                    }
                );

        }


        else {

            response =
                await fetch(
                    API_URL,
                    {

                        method:
                            "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify(
                                contacto
                            )

                    }
                );

        }


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "No se pudo guardar el contacto"
            );

        }


        cerrarModalContacto();


        await cargarContactos();


        mostrarNotificacion(
            id
                ? "Contacto actualizado correctamente"
                : "Contacto creado correctamente"
        );


    } catch (error) {

        console.error(error);


        const mensaje =
            document.getElementById(
                "modalMensaje"
            );


        if (mensaje) {

            mensaje.textContent =
                error.message;

        }

    }

}


/* =========================
   ABRIR ELIMINAR
========================= */

function abrirEliminar(id) {

    contactoEliminarId =
        id;


    const mensaje =
        document.getElementById(
            "eliminarMensaje"
        );


    if (mensaje) {

        mensaje.textContent =
            "";

    }


    const modal =
        document.getElementById(
            "modalEliminar"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =========================
   ELIMINAR CONTACTO
========================= */

async function eliminarContacto() {

    if (
        !contactoEliminarId
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/${contactoEliminarId}`,
                {

                    method:
                        "DELETE"

                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "No se pudo eliminar el contacto"
            );

        }


        cerrarEliminar();


        await cargarContactos();


        mostrarNotificacion(
            "Contacto eliminado correctamente"
        );


    } catch (error) {

        console.error(error);


        mostrarNotificacion(
            error.message,
            true
        );

    }

}


/* =========================
   CERRAR MODAL CONTACTO
========================= */

function cerrarModalContacto() {

    const modal =
        document.getElementById(
            "modalContacto"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================
   CERRAR MODAL ELIMINAR
========================= */

function cerrarEliminar() {

    const modal =
        document.getElementById(
            "modalEliminar"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }


    contactoEliminarId =
        null;

}


/* =========================
   BUSCAR CONTACTOS
========================= */

function buscarContactos(
    event
) {

    const texto =
        event.target.value
            .toLowerCase()
            .trim();


    if (!texto) {

        renderizarContactos(
            contactos
        );

        return;

    }


    const resultados =
        contactos.filter(
            contacto => {

                const nombre =
                    String(
                        contacto.nombre ||
                        ""
                    )
                    .toLowerCase();


                const correo =
                    String(
                        contacto.correo ||
                        ""
                    )
                    .toLowerCase();


                const empresa =
                    String(
                        contacto.empresa ||
                        ""
                    )
                    .toLowerCase();


                const telefono =
                    String(
                        contacto.telefono ||
                        ""
                    )
                    .toLowerCase();


                return (

                    nombre.includes(
                        texto
                    )

                    ||

                    correo.includes(
                        texto
                    )

                    ||

                    empresa.includes(
                        texto
                    )

                    ||

                    telefono.includes(
                        texto
                    )

                );

            }
        );


    renderizarContactos(
        resultados
    );

}


/* =========================
   NOTIFICACIONES
========================= */

function mostrarNotificacion(
    mensaje,
    error = false
) {

    const notificacion =
        document.getElementById(
            "notificacion"
        );


    if (!notificacion) {
        return;
    }


    notificacion.textContent =
        mensaje;


    notificacion.style.background =
        error
            ? "#dc2626"
            : "#111827";


    notificacion.classList.add(
        "show"
    );


    setTimeout(
        () => {

            notificacion.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* =========================
   ESCAPAR HTML
========================= */

function escapeHTML(
    texto
) {

    if (
        texto === null ||
        texto === undefined
    ) {

        return "";

    }


    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        texto;


    return div.innerHTML;

}