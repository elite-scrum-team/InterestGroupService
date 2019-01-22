
const db = require('../models')
const express = require('express')

const makeRoutesFromController = require('../helpers/makeRoutesFromController')

const newsController = require('../controllers/newsSubscriber')
const { defaultConfig } = require('../helpers/defaults')


module.exports = makeRoutesFromController(newsController, 
    {
        ...defaultConfig,
        
    }, express.Router())