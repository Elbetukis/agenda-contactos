const request = require("supertest");
const app = require("../../src/app");

const service = require("../../src/services/contactoService");

jest.mock("../../src/services/contactoService");

beforeEach(() => {
    jest.resetAllMocks();
});

describe("Contacto Controller", () => {

    test("Debe obtener todos los contactos", async () => {

        service.obtenerTodos.mockResolvedValue([
            {
                id: 1,
                nombre: "Albert",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            }
        ]);

        const response = await request(app)
            .get("/contactos");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(1);
        expect(service.obtenerTodos).toHaveBeenCalledTimes(1);

    });

    test("Debe devolver error 500 si falla el servicio", async () => {

        service.obtenerTodos.mockRejectedValue(
            new Error("Error interno")
        );

        const response = await request(app)
            .get("/contactos");

        expect(response.statusCode).toBe(500);
        expect(response.body.error).toBe("Error interno");

    });

    test("Debe crear un contacto", async () => {

        service.crear.mockResolvedValue({
            id: 1,
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        });

        const response = await request(app)
            .post("/contactos")
            .send({
                nombre: "Albert",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.nombre).toBe("Albert");
        expect(service.crear).toHaveBeenCalledTimes(1);

    });

    test("Debe devolver error 400 si falla la creación", async () => {

        service.crear.mockRejectedValue(
            new Error("El nombre es obligatorio")
        );

        const response = await request(app)
            .post("/contactos")
            .send({
                nombre: "",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("El nombre es obligatorio");

    });
    test("Debe obtener un contacto por ID", async () => {

        service.obtenerPorId.mockResolvedValue({
            id: 1,
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        });


        const response = await request(app)
            .get("/contactos/1");


        expect(response.statusCode).toBe(200);
        expect(response.body.id).toBe(1);
        expect(service.obtenerPorId)
            .toHaveBeenCalledWith("1");

    });


    test("Debe devolver 404 si el contacto no existe", async () => {

        service.obtenerPorId.mockResolvedValue(undefined);


        const response = await request(app)
            .get("/contactos/99");


        expect(response.statusCode).toBe(404);
        expect(response.body.error)
            .toBe("Contacto no encontrado");

    });


    test("Debe devolver error 500 si falla la búsqueda por ID", async () => {

        service.obtenerPorId.mockRejectedValue(
            new Error("Error interno")
        );


        const response = await request(app)
            .get("/contactos/1");


        expect(response.statusCode).toBe(500);
        expect(response.body.error)
            .toBe("Error interno");

    });



    test("Debe actualizar un contacto", async () => {

        service.actualizar.mockResolvedValue({
            id: 1,
            nombre: "Albert actualizado",
            telefono: "2711234567",
            correo: "nuevo@gmail.com",
            empresa: "Google"
        });


        const response = await request(app)
            .put("/contactos/1")
            .send({
                nombre: "Albert actualizado",
                telefono: "2711234567",
                correo: "nuevo@gmail.com",
                empresa: "Google"
            });


        expect(response.statusCode).toBe(200);
        expect(response.body.nombre)
            .toBe("Albert actualizado");

        expect(service.actualizar)
            .toHaveBeenCalledWith(
                "1",
                expect.any(Object)
            );

    });



    test("Debe devolver 404 si no existe el contacto al actualizar", async () => {

        service.actualizar.mockResolvedValue(undefined);


        const response = await request(app)
            .put("/contactos/99")
            .send({
                nombre: "Nuevo",
                telefono: "2711234567",
                correo: "nuevo@gmail.com",
                empresa: "Google"
            });


        expect(response.statusCode).toBe(404);
        expect(response.body.error)
            .toBe("Contacto no encontrado");

    });



    test("Debe eliminar un contacto", async () => {

        service.eliminar.mockResolvedValue(true);


        const response = await request(app)
            .delete("/contactos/1");


        expect(response.statusCode).toBe(200);
        expect(response.body.mensaje)
            .toBe("Contacto eliminado correctamente");


        expect(service.eliminar)
            .toHaveBeenCalledWith("1");

    });



    test("Debe devolver 404 si no existe el contacto al eliminar", async () => {

        service.eliminar.mockResolvedValue(false);


        const response = await request(app)
            .delete("/contactos/99");


        expect(response.statusCode).toBe(404);
        expect(response.body.error)
            .toBe("Contacto no encontrado");

    });test("Debe devolver error 400 si falla la actualización", async () => {

    service.actualizar.mockRejectedValue(
        new Error("Error al actualizar")
    );


    const response = await request(app)
        .put("/contactos/1")
        .send({
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        });


    expect(response.statusCode).toBe(400);
    expect(response.body.error)
        .toBe("Error al actualizar");

});


test("Debe devolver error 500 si falla la eliminación", async () => {

    service.eliminar.mockRejectedValue(
        new Error("Error al eliminar")
    );


    const response = await request(app)
        .delete("/contactos/1");


    expect(response.statusCode).toBe(500);
    expect(response.body.error)
        .toBe("Error al eliminar");

});
});