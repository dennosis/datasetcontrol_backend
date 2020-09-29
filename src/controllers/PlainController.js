const Plain = require('../models/Plain');



    const index = async (req, res) => {
        try {
            if(req.query){
                res.json(await Plain.find({...req.query}).select({ "name": 1, "_id": 1}))
            }else{
                res.json(await Plain.find().select({ "name": 1, "_id": 1}))
            }
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

            if(name)        plain.name=name
            if(spaces)      plain.spaces=spaces
            if(path)        plain.path=path
            if(height)      plain.height=height
            if(width)       plain.width=width
            if(height_px)   plain.height_px=height_px 
            if(width_px)    plain.width_px=width_px 
            if(imgHeight_px)plain.imgHeight_px=imgHeight_px 
            if(imgWidth_px) plain.imgWidth_px=imgWidth_px
            if(imgX_px)     plain.imgX_px=imgX_px 
            if(imgY_px)     plain.imgY_px=imgY_px
            if(svg)         plain.svg=svg

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