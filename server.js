const express = require('express')
const cors = require('cors')
const sqlite = require('sqlite3').verbose()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


let db = new sqlite.Database('database.db', (error) => {
  if (error) {
    console.log(error);
  }
  else{
    console.log('Database connected');
  }
})


// GET
app.get('/student', (req, res) => {
  let sql = `SELECT * FROM Students;`

  db.all(sql, (error, array) => {
    if(error) {
      console.log(error);
      res.status(201).send('Something wrong with get data!')
    }
    else{
      res.send(array)
    }
  })
})


// POST
app.post('/student', (req, res) => {
  let { name, surname, course } = req.body

  let sql = `
  INSERT INTO Students (  name, surname, course )
  VALUES( ?, ?, ?);` 

  db.run(sql, [ name, surname, course], (error)=> {
    if (error) {
      res.status(500).send('Oops Error')
    }
    else{
      res.sendStatus(201)
    }
  })
})


// DELETE
app.delete('/student/:id', (req, res) => {
  let id = req.params.id

  let sql = `DELETE FROM Students WHERE id=?`

  db.run(sql, [id], (error) => {
    if (error){
      res.status(500).send('Oops Error Bro')
    }
    else{
      res.send(201)
    }
  })
})




let PORT = 8080
let URL = 'http://localhost:' + PORT

app.listen(PORT, () => {
  console.log('Server is ready' + URL);
})