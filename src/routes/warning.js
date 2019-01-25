
const db = require('../models')
const express = require('express')

const makeRoutesFromController = require('../helpers/makeRoutesFromController')

const warningController = require('../controllers/warningSubscriber')
const { defaultConfig } = require('../helpers/defaults')


module.exports = makeRoutesFromController(warningController, 
    {
        ...defaultConfig,
        
    }, express.Router())
