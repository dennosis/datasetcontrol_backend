const schema  = require('../database/schema')

class Plain extends schema {
    constructor(obj) {
        super()
        this.id = obj.id
        this.path = obj.path
        this.spaces = obj.spaces;
        this.height = obj.height;
        this.width = obj.width  
    }
}

module.exports = Plain
