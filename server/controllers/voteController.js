require('../models/Vote');

const mongoose = require('mongoose');

const Vote = mongoose.model('Vote');

exports.vote = async (req, res) => {
    const result = {};
    result.status = 200;
    const voteObj = req.body.vote;
    console.log(voteObj);
    await (new Vote(voteObj)).save();
    res.send(result);
};

// get
exports.getVotes = async (req, res) => {
    const allVotes = await Vote.find();
    res.send(allVotes);
};
