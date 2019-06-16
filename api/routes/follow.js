const express = require('express');
const followController = require('../controllers/follow');
const api = express.Router();
const md_auth = require('../midelware/authenticated');

api.post('/follow', md_auth.ensureAuth, followController.saveFollow);
api.delete('/follow/:id', md_auth.ensureAuth, followController.deleteFollow);
api.get('/following/:id?/:page?', md_auth.ensureAuth, followController.getFollowingUsers);
api.get('/followed/:id?/:page?', md_auth.ensureAuth, followController.getFollowedUsers);
api.get('/get-my-follows/:followed?', md_auth.ensureAuth, followController.getMyFollows);

module.exports = api;

