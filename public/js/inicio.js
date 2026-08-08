
/* =========================
   DASHBOARD
========================= */

function actualizarDashboard(
    contactos
) {

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


    mostrarContactosRecientes(
        contactos
    );

}


/* =========================
   CONTACTOS RECIENTES
========================= */

function mostrarContactosRecientes(
    contactos
) {

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
        ultimos.length ===
        0
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
