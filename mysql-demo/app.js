const mysql = require ('mysql')
const db = mysql.createConnection ({
    host : 'localhost',
    database: 'nodejs',
    user: 'root',
    password: ''
})

db.connect((err) => {
    if (err)
        console.log(err.message)
    else {

        console.log('Connected')

            db.query('SELECT * FROM members', (err, result) => {
            // db.query('INSERT INTO members(name) VALUES ("Julie")', (err, result) => {
            if(err)
                console.log(err.message)
            else 
                console.log(result[0].name)    
        })
    }
})