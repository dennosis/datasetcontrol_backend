const Plain = require('../models/Plain');



    const index = async (req, res) => {
        try {
            const {show, isValid} = req.query

            let findPlain={}
            let fields={}

            if(isValid==='true'){
                findPlain={
                    isValid:true,
                    $expr: { $gt: [ { $size: "$spaces"}, 0 ] },
                    'spaces': { $not: { $elemMatch: { name: 'undefined' } } }    
                }
            }

            if(show==='true'){
                fields = {
                    _id: 1,
                    name: 1, 
                    height: 1,
                    width: 1,
                    height_px: 1,
                    width_px: 1,
                    isValid:1,
                    "spaces.name":1,
                    "spaces.horizontally":1,
                    "spaces.vertically":1,
                    "spaces.area":1,
                    "spaces.width":1,
                    "spaces.height":1,
                    "spaces.rcx":1,
                    "spaces.rcy":1,
                }
            }else{
                fields = { name: 1, _id: 1}
            }

            res.json(await Plain.find(findPlain).select(fields))

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Error find Plains", error: error});
        }
    }
    const create = async (req, res) => {
        try {

           const plainFind = await Plain.findOne({name:req.body.name }).select({"_id": 1})
            
            if(plainFind){
                req.body._id = plainFind._id
                return update(req, res)
            }

            const {
                name,
                isValid, 
                spaces, 
                path, 
                height, 
                width, 
                height_px, 
                width_px, 
                imgHeight_px, 
                imgWidth_px, 
                imgX_px, 
                imgY_px,
                svg
            } = req.body
            
            const plain = await Plain.create({
                name,
                isValid,
                spaces, 
                path, 
                height, 
                width, 
                height_px, 
                width_px, 
                imgHeight_px, 
                imgWidth_px,
                imgX_px, 
                imgY_px,
                svg
            })            
            return res.json(plain)

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Error create Plain", error: error});
        }
    }
    const show = async (req, res) => {
        try {
            const {id} = req.params
            const plain = await Plain.findById(id)
            return res.json(plain)

        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Error find Plain", error: error});
        }
    }
    const update =  async (req, res) => {
        try {

            const {
                _id, 
                name,
                isValid,
                spaces, 
                path, 
                height, 
                width,
                height_px, 
                width_px, 
                imgHeight_px, 
                imgWidth_px,
                imgX_px, 
                imgY_px,
                svg
            } = req.body

            const plain = await Plain.findById(_id)
            
            if(name)                        plain.name=name
            if(isValid!==undefined)         plain.isValid=isValid
            if(spaces)                      plain.spaces=spaces
            if(path)                        plain.path=path
            if(height)                      plain.height=height
            if(width)                       plain.width=width
            if(height_px)                   plain.height_px=height_px 
            if(width_px)                    plain.width_px=width_px 
            if(imgHeight_px)                plain.imgHeight_px=imgHeight_px 
            if(imgWidth_px)                 plain.imgWidth_px=imgWidth_px
            if(imgX_px)                     plain.imgX_px=imgX_px 
            if(imgY_px)                     plain.imgY_px=imgY_px
            if(svg)                         plain.svg=svg

            await plain.save()
            res.json(plain)
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Error update Plain", error: error});
        }
    }
    /*
    const delete = async (req, res) => {
        try {
            const {id} = req.params
            res.json(Plain.remove({"id":id}))
        } catch (error) {
            console.log(error)
            res.status(500).json({message: "Error remove Plain", error: error});
        }
    }
    */

module.exports = {
    index,
    create,
    show,
    update
}