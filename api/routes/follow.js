const express = require('express');
const followController = require('../controllers/follow');
const api = express.Router();
const md_auth = require('../midelware/authenticated');

api.post('/follow', md_auth.ensureAuth, followController.saveFollow);
api.delete('/follow/:id', md_auth.ensureAuth, followController.deleteFollow);

module.exports = api;

