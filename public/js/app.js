
/* =========================
   ESTADO GLOBAL
========================= */

let contactos = [];


/* =========================
   INICIALIZACIÓN
========================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        configurarNavegacion();

        await cargarContactos();

        await cambiarSeccion(
            "inicio"
        );

    }
);


/* =========================
   CARGAR CONTACTOS
========================= */

async function cargarContactos() {

    try {

        contactos =
            await api.obtenerContactos();


        console.log(
            "CONTACTOS OBTENIDOS:",
            contactos
        );


    } catch (error) {

        console.error(
            "Error al cargar contactos:",
            error
        );


        contactos = [];


        mostrarNotificacion(
            error.message,
            true
        );

    }

}


/* =========================
   EXPONER CONTACTOS
========================= */

Object.defineProperty(
    window,
    "contactos",
    {
        get: () => contactos
    }
);


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

                    const pantalla =
                        boton.dataset.pantalla;


                    cambiarSeccion(
                        pantalla
                    );

                }
            );

        }
    );

}


/* =========================
   CAMBIAR PANTALLA
========================= */

async function cambiarSeccion(
    nombreSeccion
) {

    const contenido =
        document.getElementById(
            "contenido"
        );


    if (!contenido) {
        return;
    }


    try {

        const response =
            await fetch(
                `/pantallas/${nombreSeccion}.html`
            );


        if (!response.ok) {

            throw new Error(
                "No se pudo cargar la pantalla"
            );

        }


        const html =
            await response.text();


        contenido.innerHTML =
            html;


        actualizarMenu(
            nombreSeccion
        );


        actualizarTitulo(
            nombreSeccion
        );


        inicializarPantalla(
            nombreSeccion
        );


    } catch (error) {

        contenido.innerHTML = `

            <div style="
                padding: 30px;
                text-align: center;
            ">

                <h2>
                    Error al cargar la pantalla
                </h2>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


/* =========================
   ACTUALIZAR MENÚ
========================= */

function actualizarMenu(
    nombreSeccion
) {

    document
        .querySelectorAll(
            ".menu-item"
        )
        .forEach(
            button => {

                button.classList.remove(
                    "active"
                );


                if (
                    button.dataset.pantalla ===
                    nombreSeccion
                ) {

                    button.classList.add(
                        "active"
                    );

                }

            }
        );

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


    else if (
        nombreSeccion ===
        "nuevoContacto"
    ) {

        titulo.textContent =
            contactoEditandoId
                ? "Editar contacto"
                : "Nuevo contacto";


        subtitulo.textContent =
            contactoEditandoId
                ? "Modifica la información del contacto"
                : "Registra un nuevo contacto en tu agenda";

    }

}


/* =========================
   INICIALIZAR PANTALLA
========================= */

function inicializarPantalla(
    nombreSeccion
) {


    /* =========================
       INICIO
    ========================== */

    if (
        nombreSeccion ===
        "inicio"
    ) {

        actualizarDashboard(
            contactos
        );


        const btnNuevo =
            document.getElementById(
                "btnNuevoDesdeInicio"
            );


        if (btnNuevo) {

            btnNuevo.addEventListener(
                "click",
                abrirNuevo
            );

        }


        const btnVer =
            document.getElementById(
                "btnVerContactos"
            );


        if (btnVer) {

            btnVer.addEventListener(
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
       CONTACTOS
    ========================== */

    else if (
        nombreSeccion ===
        "contactos"
    ) {

        renderizarContactos(
            contactos
        );


        const btnNuevo =
            document.getElementById(
                "btnNuevoContacto"
            );


        if (btnNuevo) {

            btnNuevo.addEventListener(
                "click",
                abrirNuevo
            );

        }


        const buscador =
            document.getElementById(
                "buscarContacto"
            );


        if (buscador) {

            buscador.addEventListener(
                "input",
                event => {

                    buscarContactos(
                        contactos,
                        event.target.value
                    );

                }
            );

        }

    }


    /* =========================
       NUEVO / EDITAR
    ========================== */

    else if (
        nombreSeccion ===
        "nuevoContacto"
    ) {

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


        const cancelar =
            document.getElementById(
                "cancelarFormulario"
            );


        if (cancelar) {

            cancelar.addEventListener(
                "click",
                cancelarFormulario
            );

        }

    }

}


/* =========================
   EVENTOS GENERALES
========================= */

function configurarEventos() {

    /*
        Los eventos de cada pantalla
        se configuran en
        inicializarPantalla().
    */

}
