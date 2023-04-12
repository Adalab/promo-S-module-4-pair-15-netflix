const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dbConnect = require('../config/connection');
dbConnect();

const Movies = require('../models/movies');


// create and config server
const server = express();
server.use(cors());
server.use(express.json());

server.set('view engine', 'ejs');


// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

/*
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
// server.post('/movies', (req, res) => {
//   console.log('Subiendo a la base de datos una película.');

//   const { title, gender, image, categories, yearMovie } = req.body;

//   connection.query(
//     `INSERT INTO movies (title, gender, image, categories, yearMovie)
//      VALUES (?, ?, ?, ?, ?)`,
//     [title, gender, image, categories, yearMovie],
//     (error, results, fields) => {
//       if (error) {
//         console.error('Error al insertar la película: ', error);
//         res.status(500).json({ error: 'Error al insertar la película.' });
//       } else {
//         console.log('Película insertada correctamente.');
//         res.json(results);
//       }
//     }
//   );
// });
*/

server.post("/login", (req, res) => {
  console.log("Body.", req.body.email);
  console.log("Body.", req.body.password);

  console.log("Pidiendo a la base de datos información de los usuarios.");
  connection
    .query(`SELECT * FROM users WHERE email= ? and passwordMovies= ?`, [
      req.body.email,
      req.body.password,
    ])
    .then(([results, fields]) => {
      console.log(results);
      console.log(results[0].idUsers);
      if (results.length > 0) {
        res.json({
          success: true,
          userId: results[0].idUsers
        });
      } else {
        res.json({
          success: false,
          errorMessage: "Usuaria/o no encontrada/o",
        });
      }
          });
});

server.get('/movie/:movieId', (req, res) => {

  const movieId = req.params.movieId;
    const sql = "SELECT * FROM movies WHERE movies.id=?"
    
    connection
    .query(sql, [movieId])
    .then(([results, fields]) => {
      console.log(results)
       res.render("movie", results[0]);
    })
   .catch((err) => {
   throw err;
   });
   
   });


// public
const staticServerPathAdmin = './src/public-react';
server.use(express.static(staticServerPathAdmin));
const staticServerImages1 = './src/public-movies-images';
server.use(express.static(staticServerImages1));


// error
/*
app.get('*', (req, res) => {
  //res.send('Error 404');

  const absolutePathToError404 = path.join(__dirname, '../public_vanilla/error404.html');

  res.status(404).sendFile(absolutePathToError404);
})*/


// MONGO


server.get('/movies_all_mongo', (req, res) => {
  
  console.log(req.query.gender)
  console.log(req.query.sort)

  const conditions = {};

  if( req.query.gender ) {
    conditions.gender= req.query.gender;
  }

  
  Movies.find(conditions)
    .sort({ title: req.query.sort === 'asc' ? 1 : -1 })
    .then((docs) => {
      console.log(docs);
      res.json({
        success: true,
        movies: docs
      });
    })
    .catch((error) => {
      throw error;
    });
}
);



