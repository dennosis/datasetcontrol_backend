const Plain = require('../models/Plain');

module.exports = {

    index: async (req, res) => {
        try {
            if(req.query){
                res.json(Plain.find({...req.query}))
            }else{
                res.json(Plain.find())
            }
        } catch (error) {
            res.status(500).json({message: "Error find Plains", error: error});
        }
    },
    create : async (req, res) => {
        try {
            const {id, spaces, path, height, width} = req.body
            
            const plain = await new Plain({id, spaces, path, height, width })

            await plain.save()
            
            return res.json(plain)

        } catch (error) {
            res.status(500).json({message: "Error create Plain", error: error});
        }
    },
    show : async (req, res) => {
        try {
            const {id} = req.params
            const plain = await Plain.findOne({"id":`${id}`})
            return res.json(plain)

        } catch (error) {
            res.status(500).json({message: "Error find Plain", error: error});
        }
    },
    update: async (req, res) => {
        try {

            const {id, spaces, path, height, width } = req.body

            const plain = await Plain.findOne({"id":id})

            plain.spaces=spaces
            plain.path=path
            plain.height=height
            plain.width=width

            await plain.save()
            res.json(plain)
        } catch (error) {
            res.status(500).json({message: "Error update Plain", error: error});
        }
    },
    delete:async (req, res) => {
        try {
            const {id} = req.params
            res.json(Plain.remove({"id":id}))
        } catch (error) {
            res.status(500).json({message: "Error remove Plain", error: error});
        }
    }



}