
/* =========================
   API DE CONTACTOS
========================= */

const api = {

    /* =========================
       OBTENER TODOS
    ========================= */

    async obtenerContactos() {

        const response =
            await fetch("/contactos");


        if (!response.ok) {

            const data =
                await response.json();

            throw new Error(
                data.error ||
                "No se pudieron obtener los contactos"
            );

        }


        return await response.json();

    },


    /* =========================
       OBTENER POR ID
    ========================= */

    async obtenerContacto(id) {

        const response =
            await fetch(
                `/contactos/${id}`
            );


        if (!response.ok) {

            const data =
                await response.json();

            throw new Error(
                data.error ||
                "No se pudo obtener el contacto"
            );

        }


        return await response.json();

    },


    /* =========================
       CREAR
    ========================= */

    async crearContacto(contacto) {

        const response =
            await fetch(
                "/contactos",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(contacto)
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "No se pudo crear el contacto"
            );

        }


        return data;

    },


    /* =========================
       ACTUALIZAR
    ========================= */

    async actualizarContacto(
        id,
        contacto
    ) {

        const response =
            await fetch(
                `/contactos/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(contacto)
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "No se pudo actualizar el contacto"
            );

        }


        return data;

    },


    /* =========================
       ELIMINAR
    ========================= */

    async eliminarContacto(id) {

        const response =
            await fetch(
                `/contactos/${id}`,
                {
                    method: "DELETE"
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


        return data;

    }

};
