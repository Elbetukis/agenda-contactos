
/* =========================
   RENDERIZAR CONTACTOS
========================= */

function renderizarContactos(
    lista = []
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
        lista.length ===
        0
    ) {

        tabla.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:30px;
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
                            onclick="abrirEditar(${contacto.id})"
                            title="Editar"
                        >
                            ✏️
                        </button>


                        <button
                            class="delete-button"
                            onclick="abrirEliminar(${contacto.id})"
                            title="Eliminar"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            tabla.appendChild(
                fila
            );

        }
    );

}


/* =========================
   BUSCAR CONTACTOS
========================= */

function buscarContactos(
    contactos,
    texto
) {

    const busqueda =
        texto
            .toLowerCase()
            .trim();


    if (!busqueda) {

        renderizarContactos(
            contactos
        );

        return;

    }


    const resultados =
        contactos.filter(
            contacto => {

                return (

                    (
                        contacto.nombre ||
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            busqueda
                        )

                    ||

                    (
                        contacto.correo ||
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            busqueda
                        )

                    ||

                    (
                        contacto.empresa ||
                        ""
                    )
                        .toLowerCase()
                        .includes(
                            busqueda
                        )

                );

            }
        );


    renderizarContactos(
        resultados
    );

}
