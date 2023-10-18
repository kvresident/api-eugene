const db = require("./mySql.conn");

function saveMedia(mediaBuffer, type, userId, fileName, callBack) {
    const createdAt = new Date().toISOString();

    db.query(
        `INSERT INTO media (data, type, owner, fileName, createdAt) VALUES (?, ?, ?, ?, ?)`,
        [
            mediaBuffer, type, userId, fileName, createdAt
        ],
        (err, result) => {
            if (err) {
                console.log(err)
                callBack(err)
            } else {
                console.log(result)
                callBack(null, result)
            }
        }
    )
}

function deleteMedia(mediaId, userId, callBack) {
    db.query(
        'DELETE FROM media WHERE id = ? AND owner = ?',
        [mediaId, userId],
        (err, result) => {
            if (err) {
                console.log(err)
                callBack(err)
            } else {
                console.log(result)
                callBack(null, result)
            }
        }
    )
}

function getById(mediaId, callBack){
    db.query(
        'SELECT * FROM media WHERE id = ?',
        [mediaId],
        (err, result) => {
            if (err) {
                console.log(err)
                callBack(err)
            } else {
                console.log(result)
                callBack(null, result)
            }
        }
    )
}

function changeAlt(mediaId, userId, altText, callBack){
    db.query(
        'UPDATE media SET alt = ? WHERE id = ? AND owner = ?',
        [altText, mediaId, userId],
        (err, result) => {
            if (err) {
                console.log(err)
                callBack(err)
            } else {
                console.log(result)
                callBack(null, result)
            }
        }
    )
}

module.exports = {
    saveMedia, deleteMedia, getById, changeAlt
}