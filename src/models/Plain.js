const schema  = require('../database/schema')

class Plain extends schema {
    constructor(obj) {
        super()
        this.id = obj.id
        this.path = obj.path
        this.spaces = obj.spaces
        this.height = obj.height
        this.width = obj.width 
        this.height_px = obj.height_px
        this.width_px = obj.width_px
        this.imgHeight_px = obj.imgHeight_px
        this.imgWidth_px = obj.imgWidth_px
        this.imgX_px = obj.imgX_px
        this.imgY_px = obj.imgY_px
    }
}

module.exports = Plain

