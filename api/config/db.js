const mysql = require("mysql");

const db_connection = mysql.createPool({

  host: 'bj0ga9ayeu7fhl9ai466-mysql.services.clever-cloud.com',
  user: 'uomkbxoofiygkgpx',
  password: '7nBaTirWmL5dyT4fTxDr',
  database: 'bj0ga9ayeu7fhl9ai466'
});


db_connection.getConnection(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + db_connection.threadId);
});

module.exports = {
  db_connection

}