const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});


let connection;  // Aquí almacenaremos la conexión a la base de datos

mysql
  .createConnection({
    host: 'localhost',
    database: 'netflix',
    user: 'root',
    password: 'Bartolo_12',
  })
  .then(conn => {
    connection = conn;
    connection
      .connect()
      .then(() => {
        console.log(`Conexión establecida con la base de datos (identificador=${connection.threadId})`);
      })
      .catch((err) => {
        console.error('Error de conexion: ' + err.stack);
      });
  })
  .catch((err) => {
    console.error('Error de configuración: ' + err.stack);
  });
// le puse la condicion si en gender '' que muestre todas y ademas como es un query los generos estaban en mayusculas tuve que cambiarlos nuevamente en el html.
server.get('/movies', (req, res) => {
  const genreFilterParam = req.query.gender;
  if (genreFilterParam === '') {
    connection
      .query('SELECT * FROM movies')
      .then(([results, fields]) => {
        console.log('Información recuperada:');
        results.forEach((result) => {
          console.log(result);
          console.log(genreFilterParam);
        });
        res.json({
          success: true,
          movies: results
        });
      })
      .catch((err) => {
        throw err;
      });
  } else {
    connection
      .query('SELECT * FROM movies WHERE gender = ? ', [genreFilterParam])
    .then(([results, fields]) => {
      console.log('Información recuperada:');
      results.forEach((result) => {
        console.log(result);
        console.log(genreFilterParam);
      });
      res.json({
        success: true,
        movies: results
});
    })
    .catch((err) => {
      throw err;
    });
  }
});


// server.post('/movies', (req, res) => {
//   console.log('subiendo a la base de datos una peli.');
//   const { title, gender, image, categories, yearMovie } = req.body;
//   connection
//     .query(`INSERT INTO movies (title,gender,image,categories,yearMovie) VALUES ('pepi','pepi','pepi','pepi','1999-01-01')`)
//     .then(([results, fields]) => {
//       console.log('Información enviada:');
//       results.forEach((result) => {
//         console.log(result);
//       });

//       res.json(results);
//     })
//     .catch((err) => {
//       throw err;
//     });
// });
server.post('/movies', (req, res) => {
  console.log('Subiendo a la base de datos una película.');

  const { title, gender, image, categories, yearMovie } = req.body;

  connection.query(
    `INSERT INTO movies (title, gender, image, categories, yearMovie)
     VALUES (?, ?, ?, ?, ?)`,
    [title, gender, image, categories, yearMovie],
    (error, results, fields) => {
      if (error) {
        console.error('Error al insertar la película: ', error);
        res.status(500).json({ error: 'Error al insertar la película.' });
      } else {
        console.log('Película insertada correctamente.');
        res.json(results);
      }
    }
  );
});