const service = require("../services/contactoService");


const obtenerTodos = async (req, res) => {

    try {

        const contactos = await service.obtenerTodos();

        res.status(200).json(contactos);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


const obtenerPorId = async (req, res) => {

    try {

        const contacto = await service.obtenerPorId(req.params.id);

        if (!contacto) {
            return res.status(404).json({
                error: "Contacto no encontrado"
            });
        }

        res.status(200).json(contacto);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


const crear = async (req, res) => {

    try {

        const contacto = await service.crear(req.body);

        res.status(201).json(contacto);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


const actualizar = async (req, res) => {

    try {

        const contacto = await service.actualizar(
            req.params.id,
            req.body
        );

        if (!contacto) {
            return res.status(404).json({
                error: "Contacto no encontrado"
            });
        }

        res.status(200).json(contacto);

    } catch (error) {

        res.status(400).json({
            error: error.message
        });

    }

};


const eliminar = async (req, res) => {

    try {

        const eliminado = await service.eliminar(req.params.id);

        if (!eliminado) {
            return res.status(404).json({
                error: "Contacto no encontrado"
            });
        }

        res.status(200).json({
            mensaje: "Contacto eliminado correctamente"
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

};


module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};