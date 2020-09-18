const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('./src/database/db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ 
    Plain:[]
}).write()

module.exports = db