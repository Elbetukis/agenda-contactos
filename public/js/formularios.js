
let contactoEditandoId = null;


/* =========================
   NUEVO CONTACTO
========================= */

function abrirNuevo() {

    contactoEditandoId = null;


    cambiarSeccion(
        "nuevoContacto"
    );

}


/* =========================
   EDITAR CONTACTO
========================= */

async function abrirEditar(
    id
) {

    const contacto =
        window.contactos.find(
            contacto =>
                contacto.id === id
        );


    if (!contacto) {

        mostrarNotificacion(
            "Contacto no encontrado",
            true
        );

        return;

    }


    contactoEditandoId =
        contacto.id;


    await cambiarSeccion(
        "nuevoContacto"
    );


    document.getElementById(
        "contactoId"
    ).value =
        contacto.id;


    document.getElementById(
        "nombre"
    ).value =
        contacto.nombre;


    document.getElementById(
        "telefono"
    ).value =
        contacto.telefono;


    document.getElementById(
        "correo"
    ).value =
        contacto.correo;


    document.getElementById(
        "empresa"
    ).value =
        contacto.empresa || "";


    const titulo =
        document.getElementById(
            "tituloFormulario"
        );


    const subtitulo =
        document.getElementById(
            "subtituloFormulario"
        );


    if (titulo) {

        titulo.textContent =
            "Editar contacto";

    }


    if (subtitulo) {

        subtitulo.textContent =
            "Modifica la información del contacto";

    }


    actualizarTitulo(
        "nuevoContacto"
    );

}


/* =========================
   GUARDAR CONTACTO
========================= */

async function guardarContacto(
    event
) {

    event.preventDefault();


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

        /* =========================
           EDITAR
        ========================== */

        if (
            contactoEditandoId !==
            null
        ) {

            await api.actualizarContacto(
                contactoEditandoId,
                contacto
            );


            mostrarNotificacion(
                "Contacto actualizado correctamente"
            );

        }


        /* =========================
           CREAR
        ========================== */

        else {

            await api.crearContacto(
                contacto
            );


            mostrarNotificacion(
                "Contacto creado correctamente"
            );

        }


        contactoEditandoId = null;


        await cargarContactos();


        await cambiarSeccion(
            "contactos"
        );


    } catch (error) {

        const mensaje =
            document.getElementById(
                "modalMensaje"
            );


        if (mensaje) {

            mensaje.textContent =
                error.message;

        } else {

            mostrarNotificacion(
                error.message,
                true
            );

        }

    }

}


/* =========================
   CANCELAR
========================= */

function cancelarFormulario() {

    contactoEditandoId = null;


    cambiarSeccion(
        "contactos"
    );

}
