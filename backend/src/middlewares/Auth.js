const User  = require('../models/User');

module.exports = {
    private: async (req, res, next) => {
        if(!req.query.token && !req.body.token) {
            return res.status(401).json({error: 'Token not found'});
        }

        let token = '';

        if(req.query.token) {
            token = req.query.token;
        } 

        if(req.body.token) {
            token = req.body.token;
        }

        if(token == "") {
            return res.status(401).json({error: 'Token not found'});
        }

        const user = await User.findOne({token});

        if(!user) {
            return res.status(401).json({error: 'Invalid token'});
        }

        next();
    }
}