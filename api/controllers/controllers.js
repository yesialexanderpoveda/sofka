// session  user
var sessionUser;
// data db
const { db_connection } = require('./../config/db')
const sqlSearch = 'SELECT user.alias from user where user.alias = ?';
const sqlLogin = 'SELECT * FROM user WHERE alias = ? AND password = ?'

//files sttatic
const path = require('path');
const { redirect } = require('express/lib/response');
let file = path.resolve(__dirname + './../../views/dashboard/dashboard.html')


//CONTROLLER REGISTER

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

//CONTROLLER LOGIN

const login = async (req, res) => {

  const { alias, password } = req.body;

  db_connection.query(sqlLogin, [alias, password], async (err, rows) => {

    if (err) throw err;
    let dataQuery = await rows.filter(elements => elements.alias === alias && elements.password === password);
    if (dataQuery.length <= 0) res.redirect('/')
    else {
      res.redirect('/dashboard');
      sessionUser = alias
    }
  })

}

//VIEW DASHBOARD

const dashboard = async (req, res) => {

  res.sendFile(path.resolve(`${file}`))

}

// CONTROLLER USER

const user = async (req, res) => {

  db_connection.query(`select idcategory, iduser from user where user.alias = '${sessionUser}'`, async (err, row) => {


    if (err) throw err;
  

    db_connection.query(`

     select category.idcategory, category.name_category,  user.alias FROM category INNER JOIN user ON user.iduser = ${row[0].iduser} where category.idcategory = ${row[0].idcategory}
    
     `, async (err, rows) => {
      if (err) throw err;
      res.json(`${rows[0].idcategory}, ${rows[0].name_category}, ${rows[0].alias}`)

    })

  })

}

//CONTROLLER GAME 

const game = async (req,res)=>{
  
  console.log(sessionUser);

 db_connection.query(`SELECT user.idcategory FROM user WHERE user.alias = '${sessionUser}'`, async(err, row)=>{
  
  if(err) throw err;

  db_connection.query(`
  SELECT category.name_category, test.question, test.res_one, test.res_two, test.res_three, test.res_four, test.res_true FROM category INNER JOIN test ON category.idcategory = '${row[0].idcategory}' WHERE test.idcategory = '${row[0].idcategory}'
  `, async (err, rows) =>{

    if(err) throw err;
    data = rows.map((ele) => {
      
    return `${ele.name_category}, ${ele.question}, ${ele.res_one}, ${ele.res_two}, ${ele.res_three}, ${ele.res_four}, ${ele.res_true}.`
  })
    
    res.json(`${data}`);
  }
  )  

  })


}
// UPDATE LEVEL GAME

const updateCategory = async (req, res) =>{
  
  const {idcategory} = await req.body;  
  let data = parseInt(idcategory)

  if(idcategory < 5){
  
    data++;
    console.log(idcategory, sessionUser, data++);
  
  db_connection.query(`UPDATE user SET user.idcategory = ${data} where user.alias = '${sessionUser}'`, async(err, row) =>{
   
    if(err) throw err;
    console.log(row);
    res.redirect('/dashboard')

  })
 

}else if(idcategory == 5){
  
  res.redirect('/dashboard');
}

}

module.exports.updateCategory = updateCategory;
module.exports.game = game;
module.exports.user = user;
module.exports.dashboard = dashboard;
module.exports.register = register;
module.exports.login = login;