const repository = require("../repositories/contactoRepository");

const obtenerTodos = async () => {
    return await repository.obtenerTodos();
};

const obtenerPorId = async (id) => {
    return await repository.obtenerPorId(id);
};

const crear = async (contacto) => {

    if (!contacto.nombre || contacto.nombre.trim() === "") {
        throw new Error("El nombre es obligatorio");
    }

    if (!contacto.correo || contacto.correo.trim() === "") {
        throw new Error("El correo es obligatorio");
    }

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexCorreo.test(contacto.correo)) {
        throw new Error("El correo no es válido");
    }

    if (!contacto.telefono || contacto.telefono.trim() === "") {
        throw new Error("El teléfono es obligatorio");
    }

    if (contacto.telefono.length !== 10) {
    throw new Error("El teléfono debe tener exactamente 10 dígitos");
    }

    const existente = await repository.buscarPorNombre(contacto.nombre);

    if (existente) {
        throw new Error("Ya existe un contacto con ese nombre");
    }

    return await repository.guardar(contacto);
};


const actualizar = async (id, contacto) => {
    return await repository.actualizar(id, contacto);
};


const eliminar = async (id) => {
    return await repository.eliminar(id);
};


module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};