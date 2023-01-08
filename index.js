// Entry Point of the API Server 
  
const express = require('express');
  
/* Creates an Express application. 
   The express() function is a top-level 
   function exported by the express module.
*/
const app = express();
const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mypassword',
    dialect: 'postgres',
    port: 5432
});
  
  
/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/
const bodyParser = require('body-parser');
const { application } = require('express');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
  
  
pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
})
  
app.get('/books', (req, res, next) => {
    console.log("books :");
    pool.query('Select * from books')
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
})

// request to get all the users by userName

app.get('/books/:author', (req, res, next) => {
    const author = req.params.author;
    pool.query()
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
});


app.get('/books/:author/:title', (req, res, next) => {
    const author = req.params.author;
    const title = req.params.title;
    pool.query(`Select * from books where author = '${author}' and title = '${title}'`)
        .then(testData => {
            console.log(testData);
            res.send(testData.rows);
        })
});

app.post('/books', (req, res, next) => {
    const book = req.body;
    pool.query(`INSERT INTO books (title, author, genre, subgenre, height, publisher)
                VALUES ('${book.title}', '${book.author}', '${book.genre}', '${book.subgenre}', ${book.height}, '${book.publisher}')`)
        .then(() => {
            res.send({ message: 'Book added successfully' });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error adding book' });
        });
});




  
// Require the Routes API  
// Create a Server and run it on the port 3000
const server = app.listen(4000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})


// url for application
// http://localhost:4000/books


// progetto:

// prendere una serie di dati e renderli chiamabili tramite API si piu livelli.

// portare la API su oracle CLOUD e usare un url external 

// To find the process id (PID) associated with the port


// ⇒ lsof -i tcp:3070 
// COMMAND PID   USER  FD  TYPE DEVICE             SIZE/OFF NODE NAME 
// node    44475 chen5 31u IPv4 0x8b1721168764e4bf 0t0 TCP *:strexec-s (LISTEN)
// Then to kill the process

// kill -9 44475