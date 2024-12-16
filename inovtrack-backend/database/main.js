const {Client} = require('pg')

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5433,
    password: "Rajee",
    database : "inovtrack_db"

})

con.connect().then(()=> console.log("connected"))