const repository = require("../../src/repositories/contactoRepository");
const service = require("../../src/services/contactoService");


jest.mock("../../src/repositories/contactoRepository");

beforeEach(() => {
    jest.resetAllMocks();
});

describe("Contacto Service", () => {

    test("Debe crear un contacto correctamente", async () => {

        repository.buscarPorNombre.mockResolvedValue(undefined);

        repository.guardar.mockResolvedValue({
            id: 1,
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        });

        const resultado = await service.crear({
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        });

        expect(resultado.id).toBe(1);
        expect(repository.buscarPorNombre).toHaveBeenCalledTimes(1);
        expect(repository.guardar).toHaveBeenCalledTimes(1);

    });

    test("Debe lanzar error si el nombre está vacío", async () => {

        await expect(
            service.crear({
                nombre: "",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            })
        ).rejects.toThrow("El nombre es obligatorio");

    });

    test("Debe lanzar error si el nombre ya existe", async () => {

        repository.buscarPorNombre.mockResolvedValue({
            id: 1,
            nombre: "Albert"
        });

        await expect(
            service.crear({
                nombre: "Albert",
                telefono: "2711234567",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            })
        ).rejects.toThrow("Ya existe un contacto con ese nombre");

    });

    test("Debe lanzar error si el correo está vacío", async () => {

        repository.buscarPorNombre.mockResolvedValue(undefined);

        await expect(
            service.crear({
                nombre: "Albert",
                telefono: "2711234567",
                correo: "",
                empresa: "OpenAI"
            })
        ).rejects.toThrow("El correo es obligatorio");

    });

    test("Debe lanzar error si el correo no es válido", async () => {

        repository.buscarPorNombre.mockResolvedValue(undefined);

        await expect(
            service.crear({
                nombre: "Albert",
                telefono: "2711234567",
                correo: "correo-invalido",
                empresa: "OpenAI"
            })
        ).rejects.toThrow("El correo no es válido");

    });

    test("Debe lanzar error si el teléfono está vacío", async () => {

        repository.buscarPorNombre.mockResolvedValue(undefined);

        await expect(
            service.crear({
                nombre: "Albert",
                telefono: "",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            })
        ).rejects.toThrow("El teléfono es obligatorio");

    });

    test("Debe lanzar error si el teléfono no tiene 10 dígitos", async () => {

        repository.buscarPorNombre.mockResolvedValue(undefined);

        await expect(
            service.crear({
                nombre: "Albert",
                telefono: "12345",
                correo: "albert@gmail.com",
                empresa: "OpenAI"
            })
        ).rejects.toThrow("El teléfono debe tener exactamente 10 dígitos");

    });

    test("Debe obtener todos los contactos", async () => {

        repository.obtenerTodos.mockResolvedValue([
            {
                id: 1,
                nombre: "Albert"
            },
            {
                id: 2,
                nombre: "Juan"
            }
        ]);

        const resultado = await service.obtenerTodos();

        expect(resultado).toHaveLength(2);
        expect(repository.obtenerTodos).toHaveBeenCalledTimes(1);

    });

    test("Debe obtener un contacto por ID", async () => {

        repository.obtenerPorId.mockResolvedValue({
            id: 1,
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "OpenAI"
        });

        const resultado = await service.obtenerPorId(1);

        expect(resultado.id).toBe(1);
        expect(repository.obtenerPorId).toHaveBeenCalledWith(1);

    });

    test("Debe actualizar un contacto", async () => {

        repository.actualizar.mockResolvedValue({
            id: 1,
            nombre: "Albert",
            telefono: "2711234567",
            correo: "albert@gmail.com",
            empresa: "Google"
        });

        const resultado = await service.actualizar(1, {
            empresa: "Google"
        });

        expect(resultado.empresa).toBe("Google");
        expect(repository.actualizar).toHaveBeenCalledWith(1, {
            empresa: "Google"
        });

    });

    test("Debe eliminar un contacto", async () => {

        repository.eliminar.mockResolvedValue(true);

        const resultado = await service.eliminar(1);

        expect(resultado).toBe(true);
        expect(repository.eliminar).toHaveBeenCalledWith(1);

    });

});