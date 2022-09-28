// Import the mssql package
//var sql = require('mssql');
const express = require('express')
const bcrypt = require('bcrypt')
//const cors = require('cors');

const app = express();
//app.use(cors());

const port = 3001;

//Database connection code
/*var db = {
    server: "pallavi2.database.windows.net", 
    database: "Stopwatch1", 
    user: "azureuser", 
    password: "Pallavirani1", 
    port: 1433,
    options: {
        encrypt: true
    }
};*/

app.use(express.json())

const users = []

/*app.get("/", (req, res) => {
  res.send("Hello from server");
});*/

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try{
    //const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    //console.log(salt)
    //console.log(hashedPassword)
    const user = { name: req.body.name, password: hashedPassword }
    users.push(user)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name)
  //If user not exist
  if(user == null)
  {
    res.status(400).send('Cannot find user')
  } 
  try{
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('User Login Success!')
      console.log('Login Successful')
    }else {
      res.send('User Not Allowed')
      console.log('Please check username or password')
    }
  } catch {
    res.status(500).send()
  }
})

/*app.get('/api/get', (req, res) => {
  var conn = new sql.ConnectionPool(db);
  conn.connect().then(function () {
      var reqst = new sql.Request(conn);
      var spView = 'EXEC ViewTask'
      reqst.query(spView).then(function(result) {
          res.send(result.recordset);
          res.send("This is working!")
          conn.close();
      });
  }).catch(function(err) {
      console.log(err);
  });
});*/

app.listen(port, () => {
  console.log(`running on port ${port}`);
});