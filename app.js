const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Importa el middleware CORS
const bodyParser = require('body-parser');



// Configuración de Express
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


// Utiliza el middleware CORS
app.use(cors());

// Conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'bticatumqgzw9m9ed0r2-mysql.services.clever-cloud.com',
  user: 'unjmofpdk307owey',
  password: 'byDePxY4c0tEnTKRXjRt',
  database: 'bticatumqgzw9m9ed0r2'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL:', err);
  } else {
    console.log('Conexión exitosa a MySQL');

    // Crear la tabla RegistroPsico si no existe
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS RegistroPsico (
        id INT AUTO_INCREMENT PRIMARY KEY,
        fecha VARCHAR(255) NOT NULL,
        situacion TEXT NOT NULL,
        emociones TEXT NOT NULL,
        pensamientos_automaticos TEXT NOT NULL,
        distorsiones_cognitivas TEXT NOT NULL,
        respuesta_racional TEXT NOT NULL,
        resultado TEXT NOT NULL
      )
    `;

    connection.query(createTableQuery, (err, results) => {
      if (err) {
        console.error('Error al crear la tabla RegistroPsico:', err);
      } else {
        console.log('Tabla RegistroPsico creada o ya existente');
      }
    });
  }
});

// Ruta para obtener todos los datos de la tabla RegistroPsico
app.get('/obtener-datos', (req, res) => {
    connection.query('SELECT * FROM RegistroPsico', (err, results) => {
      if (err) {
        console.error('Error al obtener datos de MySQL:', err);
        res.status(500).send('Error interno del servidor');
      } else {
        res.status(200).json(results);
      }
    });
  });

// Ruta de ejemplo para insertar datos en la tabla RegistroPsico
app.get('/insertar-datos', (req, res) => {
  const nuevoRegistro = {
    fecha: '202333-12-07',
    situacion: 'Lorem ipsum dolor sitectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    emociones: 'Lorem ipsum dolor sit amet, conseng elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    pensamientos_automaticos: 'Lorem ipsum dolor r adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    distorsiones_cognitivas: 'Lorem ipsuet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    respuesta_racional: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    resultado: 'Lorem ipsum dolor sit amet, conscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  };

  connection.query('INSERT INTO RegistroPsico SET ?', nuevoRegistro, (err, results) => {
    if (err) {
      console.error('Error al insertar datos en MySQL:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      console.log('Datos insertados correctamente en RegistroPsico');
      res.status(200).send('Datos insertados correctamente en RegistroPsico');
    }
  });
});

// Ruta para agregar un nuevo registro
app.post('/agregar-registro', (req, res) => {
    const nuevoRegistro = req.body; // Los datos del formulario estarán en req.body
  
    connection.query('INSERT INTO RegistroPsico SET ?', nuevoRegistro, (err, results) => {
      if (err) {
        console.error('Error al insertar datos en MySQL:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
      } else {
        console.log('Datos insertados correctamente en MySQL');
        res.status(200).json({ message: 'Registro agregado con éxito' });
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Servidor Node.js en ejecución en http://localhost:${PORT}`);
});
