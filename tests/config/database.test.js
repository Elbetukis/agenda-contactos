describe("Configuración de base de datos", () => {

    const variablesOriginales = {
        DB_HOST: process.env.DB_HOST,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT
    };

    afterEach(() => {
        process.env.DB_HOST = variablesOriginales.DB_HOST;
        process.env.DB_USER = variablesOriginales.DB_USER;
        process.env.DB_PASSWORD = variablesOriginales.DB_PASSWORD;
        process.env.DB_NAME = variablesOriginales.DB_NAME;
        process.env.DB_PORT = variablesOriginales.DB_PORT;

        jest.resetModules();
    });

    test("Debe usar los valores por defecto cuando no existen variables de entorno", () => {

        delete process.env.DB_HOST;
        delete process.env.DB_USER;
        delete process.env.DB_PASSWORD;
        delete process.env.DB_NAME;
        delete process.env.DB_PORT;

        jest.resetModules();

        const pool = require("../../src/config/database");

        expect(pool.options.host).toBe("localhost");
        expect(pool.options.user).toBe("postgres");
        expect(pool.options.password).toBe("postgres");
        expect(pool.options.database).toBe("agenda");
        expect(pool.options.port).toBe(5432);

    });

    test("Debe usar las variables de entorno cuando están configuradas", () => {

        process.env.DB_HOST = "servidor-test";
        process.env.DB_USER = "usuario-test";
        process.env.DB_PASSWORD = "password-test";
        process.env.DB_NAME = "base-test";
        process.env.DB_PORT = "5433";

        jest.resetModules();

        const pool = require("../../src/config/database");

        expect(pool.options.host).toBe("servidor-test");
        expect(pool.options.user).toBe("usuario-test");
        expect(pool.options.password).toBe("password-test");
        expect(pool.options.database).toBe("base-test");
        expect(pool.options.port).toBe("5433");

    });

});