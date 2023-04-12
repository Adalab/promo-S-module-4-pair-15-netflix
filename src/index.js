const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const dbConnect = require('../config/connection');
dbConnect();

const Movies = require('../models/movies');
const Actor = require('../models/actors')
const Favorite = require('../models/favorites')
const User = require('../models/users')


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

// MYSQL CONNECTION
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

// GET ALL MOVIES SQL

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

// AGREGAR POST MOVIES SQL

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
/*

//LOGIN MYSQL

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
*/
/*
// MOVIE ID DETAIL SQL
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
*/

// public
const staticServerPathAdmin = './src/public-react';
server.use(express.static(staticServerPathAdmin));
const staticServerImages1 = './src/public-movies-images';
server.use(express.static(staticServerImages1));




// MONGO

// MONGO GET ALL MOVIES
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

// MONG GET MOVIE DETAIL ID
server.get('/movie/:movieId', (req, res) => {

  const { movieId } = req.params;
  Movies.find({ _id: movieId })
    .then((docs) => {
      console.log(docs);
      res.render('movie', docs[0]);
    })
    .catch((error) => {
      console.log('Error', error);
    });
});

// MONGO POST ADD MOVIE
server.post('/favorites-add', (req, res) => {
  let idMovie = req.body.idMovie;
  let idUser = req.body.idUser;
  let score = req.body.score;

  const favorite = new Favorite(
    {
      movies: idMovie,
      users: idUser,
      score: score,
    })
  Favorite
    .create(favorite)
    .then((docs) => {
      res.json(docs);
    })
    .catch((error) => {
      console.log('Error', error);
    });
});

// json
/*
{
  "idMovie" : "64345c831380b912271daf2f",
    "idUser" : "64345e451380b912271daf34",
      "score" : 10
}
*/

// FAVORITE USER MOVIES
server.get('/favorites-list/:user', (req, res) => {

  Favorite.find({ users: req.params.user }, 'movies')
    .populate({
      path: 'movies',
      select: 'title gender image categorie yearMovies'
    })
    .then((response) => {
      const movies = response.map(favorite => favorite.movies)
      res.json(movies)
      console.log(movies);
    })
    .catch((error) => {
      console.log(error);
    });

});

// login Mongo
server.post("/login", (req, res) => {
  console.log("Body.", req.body.email);
  console.log("Body.", req.body.password);
  console.log("Pidiendo a la base de datos información de los usuarios.");

  User.findOne({ email: req.body.email, passwordMovies: req.body.password })

    .then((results) => {
      if (results) {
        res.json({
          success: true,
          userId: results._id
        });
      } else {
        res.json({
          success: false,
          errorMessage: "Usuaria/o no encontrada/o",
        });
      }
    });
});


// error
/*
server.get('*', (req, res) => {
  //res.send('Error 404');
  const absolutePathToError404 = path.join(__dirname, '../public-react/error404.html');
  res.status(404).sendFile(absolutePathToError404);
})
*/