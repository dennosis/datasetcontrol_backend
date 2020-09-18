const db = require('./db')
const shortid = require('shortid')

class Schema {
    static id

    static find(obj){
        const model = this.name
        if(obj){
            return db
                .get(model)
                .filter(obj)
                .value()
        }else{
            return db
                .get(model)
                .value()
        }
    }

    static async findOne(obj){
        const model = this.name
        if(obj){
            const find = await db
                .get(model)
                .find(obj)
                .value()
            if(find){
                const child = await new this(find)
                return child
            }else{
                return {}
            }
        }
    }

    static remove(obj){
        const model = this.name
        if(obj){
            return db
                .get(model)
                .remove(obj)
                .write()
        }
    }
    async save(){
        const model = this.constructor.name
        if(this.id){
            const find = db.get(model).find({ id: this.id })
            if(find.value()){
                await find
                    .assign({...this})
                    .write()
            }else{
                await db
                    .get(model)
                    .push({ ...this})
                    .write()
            }

        }else{
            this.id = await shortid.generate()
            await db
                .get(model)
                .push({ ...this})
                .write()
        }
        return this
    }
}

module.exports = Schema
