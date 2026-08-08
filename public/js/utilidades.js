/* =========================
   ESCAPAR HTML
========================= */

function escapeHTML(texto) {

    if (
        texto === null ||
        texto === undefined
    ) {
        return "";
    }


    const div =
        document.createElement("div");


    div.textContent =
        texto;


    return div.innerHTML;
}


/* =========================
   OBTENER ELEMENTO
========================= */

function obtenerElemento(id) {

    return document.getElementById(id);

}