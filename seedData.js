const mysql = require('mysql2');

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

// Datos de ejemplo
const alumnosEjemplo = [
    {
        nombre: "Laura",
        apellidos: "García Martínez",
        fechaNacimiento: "2015-05-15",
        curso: "3º Primaria",
        nombrePadre: "Ana Martínez",
        telefonoPadre: "666111222",
        emailPadre: "ana.martinez@email.com",
        socioAmpa: true
    },
    {
        nombre: "Carlos",
        apellidos: "Rodríguez López",
        fechaNacimiento: "2016-03-20",
        curso: "2º Primaria",
        nombrePadre: "Pedro Rodríguez",
        telefonoPadre: "666333444",
        emailPadre: "pedro.rodriguez@email.com",
        socioAmpa: true
    },
    {
        nombre: "María",
        apellidos: "Sánchez Ruiz",
        fechaNacimiento: "2017-09-10",
        curso: "1º Primaria",
        nombrePadre: "Carmen Ruiz",
        telefonoPadre: "666555666",
        emailPadre: "carmen.ruiz@email.com",
        socioAmpa: false
    },
    {
        nombre: "Pablo",
        apellidos: "Fernández Gil",
        fechaNacimiento: "2014-12-03",
        curso: "4º Primaria",
        nombrePadre: "Luis Fernández",
        telefonoPadre: "666777888",
        emailPadre: "luis.fernandez@email.com",
        socioAmpa: true
    },
    {
        nombre: "Elena",
        apellidos: "Torres Vega",
        fechaNacimiento: "2016-07-25",
        curso: "2º Primaria",
        nombrePadre: "María Vega",
        telefonoPadre: "666999000",
        emailPadre: "maria.vega@email.com",
        socioAmpa: false
    }
];

// Función para insertar los datos
async function insertarDatos() {
    // Primero limpiamos la tabla
    pool.query('DELETE FROM alumnos', (err) => {
        if (err) {
            console.error('Error al limpiar la tabla:', err);
            return;
        }
        
        // Insertamos los nuevos datos
        alumnosEjemplo.forEach(alumno => {
            pool.query('INSERT INTO alumnos SET ?', alumno, (err, result) => {
                if (err) {
                    console.error('Error al insertar alumno:', err);
                } else {
                    console.log('Alumno insertado con ID:', result.insertId);
                }
            });
        });
        
        // Cerramos la conexión después de 1 segundo para asegurar que todas las inserciones se completen
        setTimeout(() => {
            pool.end();
            console.log('Proceso completado');
        }, 1000);
    });
}

// Ejecutamos la función
insertarDatos();
