const Vote = require('../models/Vote');

module.exports = {

    index: async (req, res) => {
        try {
            const {date} = req.query
            if(date){
                res.json(Vote.find({date}))
            }else{
                res.json(Vote.find())
            }
        } catch (error) {
            res.status(500).json({message: "Error find votes", error: error});
        }
    },
    create : async (req, res) => {
        try {
            const { userId, restaurantId, date } = req.body
            
            if((new Date(date)).getTime() < (new Date((new Date()).toLocaleDateString())).getTime())
                return res.status(405).json({message: "Vote cannot be created on this date", error: {date}});

            const vote = await new Vote({userId, restaurantId, date})
            await vote.save()
            res.json(vote)
        } catch (error) {
            res.status(500).json({message: "Error create vote", error: error});
        }
    },
    show : async (req, res) => {
        try {
            const {id} = req.params
            const vote = await Vote.findOne({"id":id})
            return res.json(vote)

        } catch (error) {
            res.status(500).json({message: "Error find vote", error: error});
        }
    },
    update: async (req, res) => {
        try {

            const {id, userId, restaurantId } = req.body
            const vote = await Vote.findOne({"id":id})
            user.userId = userId
            user.restaurantId = restaurantId
            await vote.save()
            res.json(vote)
        } catch (error) {
            res.status(500).json({message: "Error update vote", error: error});
        }
    },
    delete:async (req, res) => {
        try {
            const {id} = req.params
            const vote = await Vote.findOne({"id":id})

            if((new Date(vote.date)).getTime() < (new Date((new Date()).toLocaleDateString())).getTime())
                return res.status(405).json({message: "Vote cannot be removed", error: {date:vote.date}});

            res.json(Vote.remove({"id":id}))
        } catch (error) {
            res.status(500).json({message: "Error remove vote", error: error});
        }
    }



}