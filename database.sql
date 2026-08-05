CREATE TABLE IF NOT EXISTS contactos (

    id SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    telefono VARCHAR(20),

    correo VARCHAR(150),

    empresa VARCHAR(100)

);