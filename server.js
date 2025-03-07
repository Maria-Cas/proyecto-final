const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Conexión MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Wordpress1@',
    database: 'ampa_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Crear tabla si no existe
pool.query(`
    CREATE TABLE IF NOT EXISTS alumnos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellidos VARCHAR(200) NOT NULL,
        fechaNacimiento DATE NOT NULL,
        curso VARCHAR(50) NOT NULL,
        nombrePadre VARCHAR(200),
        telefonoPadre VARCHAR(20),
        emailPadre VARCHAR(100),
        socioAmpa BOOLEAN DEFAULT false
    )
`, (err) => {
    if (err) {
        console.error('Error creando tabla:', err);
    } else {
        console.log('Tabla alumnos creada o ya existente');
    }
});

// Rutas API
app.get('/api/alumnos', (req, res) => {
    pool.query('SELECT * FROM alumnos', (err, results) => {
        if (err) {
            res.status(500).json({ mensaje: 'Error al obtener alumnos', error: err });
        } else {
            res.json(results);
        }
    });
});

app.post('/api/alumnos', (req, res) => {
    const { nombre, apellidos, fechaNacimiento, curso, padres, socioAmpa } = req.body;
    const alumno = {
        nombre,
        apellidos,
        fechaNacimiento,
        curso,
        nombrePadre: padres?.nombre,
        telefonoPadre: padres?.telefono,
        emailPadre: padres?.email,
        socioAmpa: socioAmpa || false
    };

    pool.query('INSERT INTO alumnos SET ?', alumno, (err, result) => {
        if (err) {
            res.status(400).json({ mensaje: 'Error al crear alumno', error: err });
        } else {
            alumno.id = result.insertId;
            res.status(201).json(alumno);
        }
    });
});

app.put('/api/alumnos/:id', (req, res) => {
    const { nombre, apellidos, fechaNacimiento, curso, padres, socioAmpa } = req.body;
    const alumno = {
        nombre,
        apellidos,
        fechaNacimiento,
        curso,
        nombrePadre: padres?.nombre,
        telefonoPadre: padres?.telefono,
        emailPadre: padres?.email,
        socioAmpa: socioAmpa || false
    };

    pool.query('UPDATE alumnos SET ? WHERE id = ?', [alumno, req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({ mensaje: 'Error al actualizar alumno', error: err });
        } else {
            res.json({ ...alumno, id: req.params.id });
        }
    });
});

app.delete('/api/alumnos/:id', (req, res) => {
    pool.query('DELETE FROM alumnos WHERE id = ?', [req.params.id], (err, result) => {
        if (err) {
            res.status(400).json({ mensaje: 'Error al eliminar alumno', error: err });
        } else {
            res.json({ mensaje: 'Alumno eliminado correctamente' });
        }
    });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
