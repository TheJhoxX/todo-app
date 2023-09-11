DROP TABLE IF EXISTS tareas;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (nombre)
);


CREATE TABLE IF NOT EXISTS tareas (
    id INT NOT NULL AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    contenido VARCHAR(255) NOT NULL,
    fechaLimite TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tipo ENUM ('importante','normal','opcional'),
    PRIMARY KEY (id),
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);
