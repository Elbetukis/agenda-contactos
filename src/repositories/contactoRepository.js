const pool = require("../config/database");

const obtenerTodos = async () => {
    const resultado = await pool.query(
        "SELECT * FROM contactos ORDER BY id"
    );

    return resultado.rows;
};

const obtenerPorId = async (id) => {
    const resultado = await pool.query(
        "SELECT * FROM contactos WHERE id = $1",
        [id]
    );

    return resultado.rows[0];
};

const buscarPorNombre = async (nombre) => {
    const resultado = await pool.query(
        "SELECT * FROM contactos WHERE LOWER(nombre) = LOWER($1)",
        [nombre]
    );

    return resultado.rows[0];
};

const guardar = async (contacto) => {
    const resultado = await pool.query(
        `INSERT INTO contactos(nombre, telefono, correo, empresa)
         VALUES($1,$2,$3,$4)
         RETURNING *`,
        [
            contacto.nombre,
            contacto.telefono,
            contacto.correo,
            contacto.empresa
        ]
    );

    return resultado.rows[0];
};

const actualizar = async (id, datos) => {
    const resultado = await pool.query(
        `UPDATE contactos
         SET nombre=$1,
             telefono=$2,
             correo=$3,
             empresa=$4
         WHERE id=$5
         RETURNING *`,
        [
            datos.nombre,
            datos.telefono,
            datos.correo,
            datos.empresa,
            id
        ]
    );

    return resultado.rows[0];
};

const eliminar = async (id) => {
    const resultado = await pool.query(
        "DELETE FROM contactos WHERE id=$1",
        [id]
    );

    return resultado.rowCount > 0;
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    buscarPorNombre,
    guardar,
    actualizar,
    eliminar
};