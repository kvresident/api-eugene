const db = require('./mySql.conn');


function createMediaTable() {
    db.query(`
    CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        data TEXT NOT NULL,
        alt TEXT,
        fileName TEXT NOT NULL,
        owner TEXT NOT NULL,
        type TEXT NOT NULL,
        createdAt TEXT
    )
    `, (error, success) => {
        if (error) {
            console.error(error)
        } else {
            console.log("media table created, ->", success)
        }
    })
}

module.exports = createMediaTable;