const request = require("supertest");
const app = require("../../src/app");
const pool = require("../../src/config/database");

describe("Pruebas de integración - Contactos", () => {

    beforeAll(async () => {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS contactos (
                id SERIAL PRIMARY KEY,
                nombre VARCHAR(100) NOT NULL,
                telefono VARCHAR(20),
                correo VARCHAR(150),
                empresa VARCHAR(100)
            )
        `);

    });


    beforeEach(async () => {

        await pool.query(
            "TRUNCATE TABLE contactos RESTART IDENTITY"
        );

    });


    afterAll(async () => {

        await pool.end();

    });


    // ==========================================
    // CREAR
    // ==========================================

    test("Debe crear un contacto correctamente", async () => {

        const contacto = {
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        };


        const response = await request(app)
            .post("/contactos")
            .send(contacto);


        expect(response.statusCode).toBe(201);

        expect(response.body).toMatchObject({
            id: 1,
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        });


        const resultado = await pool.query(
            "SELECT * FROM contactos WHERE id = $1",
            [response.body.id]
        );


        expect(resultado.rows).toHaveLength(1);

        expect(resultado.rows[0].nombre)
            .toBe("Albert");

    });


    // ==========================================
    // OBTENER TODOS
    // ==========================================

    test("Debe obtener todos los contactos", async () => {

        await pool.query(`
            INSERT INTO contactos
                (nombre, telefono, correo, empresa)
            VALUES
                ('Albert', '2711234567', 'albert@gmail.com', 'OpenAI'),
                ('Juan', '2721234567', 'juan@gmail.com', 'Google')
        `);


        const response = await request(app)
            .get("/contactos");


        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveLength(2);

        expect(response.body[0].nombre)
            .toBe("Albert");

        expect(response.body[1].nombre)
            .toBe("Juan");

    });


    // ==========================================
    // OBTENER POR ID
    // ==========================================

    test("Debe obtener un contacto por ID", async () => {

        const insert = await pool.query(`
            INSERT INTO contactos
                (nombre, telefono, correo, empresa)
            VALUES
                ('Albert', '2711234567', 'albert@gmail.com', 'OpenAI')
            RETURNING id
        `);


        const id = insert.rows[0].id;


        const response = await request(app)
            .get(`/contactos/${id}`);


        expect(response.statusCode).toBe(200);

        expect(response.body.id)
            .toBe(id);

        expect(response.body.nombre)
            .toBe("Albert");

    });


    // ==========================================
    // ID INEXISTENTE
    // ==========================================

    test("Debe devolver 404 si el contacto no existe", async () => {

        const response = await request(app)
            .get("/contactos/999");


        expect(response.statusCode).toBe(404);

        expect(response.body.error)
            .toBe("Contacto no encontrado");

    });


    // ==========================================
    // ACTUALIZAR
    // ==========================================

    test("Debe actualizar un contacto correctamente", async () => {

        const insert = await pool.query(`
            INSERT INTO contactos
                (nombre, telefono, correo, empresa)
            VALUES
                ('Albert', '2711234567', 'albert@gmail.com', 'OpenAI')
            RETURNING id
        `);


        const id = insert.rows[0].id;


        const datosActualizados = {
            nombre: "Albert Pérez",
            telefono: "2711234567",
            correo: "albertperez@gmail.com",
            empresa: "Google"
        };


        const response = await request(app)
            .put(`/contactos/${id}`)
            .send(datosActualizados);


        expect(response.statusCode).toBe(200);


        expect(response.body).toMatchObject({
            id,
            nombre: "Albert Pérez",
            telefono: "2711234567",
            correo: "albertperez@gmail.com",
            empresa: "Google"
        });


        const resultado = await pool.query(
            "SELECT * FROM contactos WHERE id = $1",
            [id]
        );


        expect(resultado.rows[0].nombre)
            .toBe("Albert Pérez");

        expect(resultado.rows[0].empresa)
            .toBe("Google");

    });


    // ==========================================
    // ACTUALIZAR ID INEXISTENTE
    // ==========================================

    test("Debe devolver 404 al actualizar un contacto inexistente", async () => {

        const response = await request(app)
            .put("/contactos/999")
            .send({
                nombre: "Albert",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            });


        expect(response.statusCode).toBe(404);

        expect(response.body.error)
            .toBe("Contacto no encontrado");

    });


    // ==========================================
    // ELIMINAR
    // ==========================================

    test("Debe eliminar un contacto correctamente", async () => {

        const insert = await pool.query(`
            INSERT INTO contactos
                (nombre, telefono, correo, empresa)
            VALUES
                ('Albert', '2711234567', 'albert@gmail.com', 'OpenAI')
            RETURNING id
        `);


        const id = insert.rows[0].id;


        const response = await request(app)
            .delete(`/contactos/${id}`);


        expect(response.statusCode).toBe(200);

        expect(response.body.mensaje)
            .toBe("Contacto eliminado correctamente");


        const resultado = await pool.query(
            "SELECT * FROM contactos WHERE id = $1",
            [id]
        );


        expect(resultado.rows)
            .toHaveLength(0);

    });


    // ==========================================
    // ELIMINAR ID INEXISTENTE
    // ==========================================

    test("Debe devolver 404 al eliminar un contacto inexistente", async () => {

        const response = await request(app)
            .delete("/contactos/999");


        expect(response.statusCode).toBe(404);

        expect(response.body.error)
            .toBe("Contacto no encontrado");

    });


    // ==========================================
    // VALIDACIÓN DE CREACIÓN
    // ==========================================

    test("No debe crear un contacto sin nombre", async () => {

        const response = await request(app)
            .post("/contactos")
            .send({
                nombre: "",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            });


        expect(response.statusCode).toBe(400);

        expect(response.body.error)
            .toBe("El nombre es obligatorio");


        const resultado = await pool.query(
            "SELECT * FROM contactos"
        );


        expect(resultado.rows)
            .toHaveLength(0);

    });


    // ==========================================
    // VALIDACIÓN DE CORREO
    // ==========================================

    test("No debe crear un contacto con correo inválido", async () => {

        const response = await request(app)
            .post("/contactos")
            .send({
                nombre: "Albert",
                telefono: "2711234567",
                correo: "correo-invalido",
                empresa: "OpenAI"
            });


        expect(response.statusCode).toBe(400);

        expect(response.body.error)
            .toBe("El correo no es válido");

    });


    // ==========================================
    // VALIDACIÓN DE TELÉFONO
    // ==========================================

    test("No debe crear un contacto con teléfono inválido", async () => {

        const response = await request(app)
            .post("/contactos")
            .send({
                nombre: "Albert",
                telefono: "12345",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            });


        expect(response.statusCode).toBe(400);

        expect(response.body.error)
            .toBe(
                "El teléfono debe tener exactamente 10 dígitos"
            );

    });


    // ==========================================
    // NOMBRE DUPLICADO
    // ==========================================

    test("No debe permitir contactos con el mismo nombre", async () => {

        await request(app)
            .post("/contactos")
            .send({
                nombre: "Albert",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            });


        const response = await request(app)
            .post("/contactos")
            .send({
                nombre: "Albert",
                telefono: "2721234567",
                correo: "otro@gmail.com",
                empresa: "Google"
            });


        expect(response.statusCode)
            .toBe(400);


        expect(response.body.error)
            .toBe(
                "Ya existe un contacto con ese nombre"
            );

    });

});