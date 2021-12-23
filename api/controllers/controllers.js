// session  user
var sessionUser;
// data db
const { db_connection } = require('./../config/db')
const sqlSearch = 'SELECT user.alias from user where user.alias = ?';
const sqlInser = 'INSERT INTO  user ()'
const sqlLogin = 'SELECT * FROM user WHERE alias = ? AND password = ?'

//files sttatic
const path = require('path')
let file = path.resolve(__dirname + './../../views/dashboard/dashboard.html')

const register = async (req, res) => {

  const { alias, password } = await req.body;

  sessionUser = alias;
  console.log(sessionUser);

  const usersObj = {
    alias,
    password

  };


  db_connection.query(sqlSearch, alias, async (err, rows, fields) => {

    if (err) throw err;
    let dataQuery = await rows.filter(elements => elements.alias === alias);

    console.log(dataQuery)
    if (dataQuery.length == 0) {

      db_connection.query(`INSERT INTO user(alias, password, idcategory) VALUES ('${alias}', '${password}', 1) `, err => {
        if (err) throw err;
        res.redirect('/dashboard');
        sessionUser = alias;

      });
    } else {

      res.redirect('/');
    }
  });

}
const login = async (req, res) => {

  const { alias, password } = req.body;

  db_connection.query(sqlLogin, [alias, password], async (err, rows) => {

    if (err) throw err;
    let dataQuery = await rows.filter(elements => elements.alias === alias && elements.password === password);
    console.log(dataQuery)
    if (dataQuery.length <= 0) res.redirect('/')
    else {
      res.redirect('/dashboard');
      sessionUser = alias
    }
  })

}



const dashboard = async (req, res) => {

  res.sendFile(path.resolve(`${file}`))

}

const user = async (req, res) => {

  console.log(sessionUser)
  let data = db_connection.query(`select idcategory from user where user.alias = '${sessionUser}'`, async (err, row) => {


    if (err) throw err;
    console.log(sessionUser, row);

    db_connection.query(`

     select category.idcategory, category.name_category,  user.alias FROM category INNER JOIN user ON category.idcategory = ${row[0].idcategory} where user.idcategory = ${row[0].idcategory}
    
     `, async (err, rows) => {
      if (err) throw err;
      res.json(`${rows[0].idcategory}, ${rows[0].name_category}, ${rows[0].alias}`)
      console.log(rows[0])

    })

  })

}

module.exports.user = user;
module.exports.dashboard = dashboard;
module.exports.register = register;
module.exports.login = login;