const pool = require("../../src/config/database");
const repository = require("../../src/repositories/contactoRepository");

jest.mock("../../src/config/database");

describe("Contacto Repository", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test("Debe obtener todos los contactos", async () => {

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 1,
                    nombre: "Albert"
                }
            ]
        });

        const resultado = await repository.obtenerTodos();

        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM contactos ORDER BY id"
        );

        expect(resultado).toHaveLength(1);
    });


    test("Debe obtener un contacto por ID", async () => {

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 1,
                    nombre: "Albert"
                }
            ]
        });


        const resultado = await repository.obtenerPorId(1);


        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM contactos WHERE id = $1",
            [1]
        );


        expect(resultado.id).toBe(1);
    });



    test("Debe buscar contacto por nombre", async () => {

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 1,
                    nombre: "Albert"
                }
            ]
        });


        const resultado = await repository.buscarPorNombre("Albert");


        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM contactos WHERE LOWER(nombre) = LOWER($1)",
            ["Albert"]
        );


        expect(resultado.nombre).toBe("Albert");
    });



    test("Debe guardar un contacto", async () => {

        const contacto = {
            nombre: "Albert",
            telefono: "1234567890",
            correo: "albert@test.com",
            empresa: "OpenAI"
        };


        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 1,
                    ...contacto
                }
            ]
        });


        const resultado = await repository.guardar(contacto);


        expect(pool.query).toHaveBeenCalled();

        expect(resultado.nombre)
            .toBe("Albert");

    });



    test("Debe actualizar un contacto", async () => {

        pool.query.mockResolvedValue({
            rows: [
                {
                    id: 1,
                    nombre: "Nuevo"
                }
            ]
        });


        const resultado = await repository.actualizar(1, {
            nombre: "Nuevo",
            telefono: "1234567890",
            correo: "nuevo@test.com",
            empresa: "Empresa"
        });


        expect(pool.query).toHaveBeenCalled();

        expect(resultado.nombre)
            .toBe("Nuevo");

    });



    test("Debe eliminar un contacto existente", async () => {

        pool.query.mockResolvedValue({
            rowCount: 1
        });


        const resultado = await repository.eliminar(1);


        expect(pool.query).toHaveBeenCalledWith(
            "DELETE FROM contactos WHERE id=$1",
            [1]
        );


        expect(resultado).toBe(true);

    });



    test("Debe regresar false si no elimina ningún contacto", async () => {

        pool.query.mockResolvedValue({
            rowCount: 0
        });


        const resultado = await repository.eliminar(1);


        expect(resultado).toBe(false);

    });

});