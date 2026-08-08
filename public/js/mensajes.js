let contactoEliminarId = null;


/* =========================
   ABRIR MODAL ELIMINAR
========================= */

function abrirEliminar(id) {

    contactoEliminarId = id;

    document
        .getElementById("modalEliminar")
        .classList.add("show");
}


/* =========================
   CONFIRMAR ELIMINACIÓN
========================= */

async function eliminarContacto() {

    if (!contactoEliminarId) {
        return;
    }


    try {

        await api.eliminarContacto(
            contactoEliminarId
        );


        cerrarEliminar();


        await cargarContactos();


        mostrarNotificacion(
            "Contacto eliminado correctamente"
        );


    } catch (error) {

        mostrarNotificacion(
            error.message,
            true
        );

    }

}


/* =========================
   CERRAR MODAL ELIMINAR
========================= */

function cerrarEliminar() {

    document
        .getElementById("modalEliminar")
        .classList.remove("show");


    contactoEliminarId = null;
}


/* =========================
   NOTIFICACIÓN
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


    setTimeout(() => {

        notificacion.classList.remove(
            "show"
        );

    }, 3000);

}