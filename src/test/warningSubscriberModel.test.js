//Unit-Testing a Model’s Name and Properties

const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');

const warningModel = require('../models/warningSubscriber');

describe('src/models/warning', () => {
    const Model = warningModel(sequelize, dataTypes);
    const instance = new Model();

    // checking if the model is the same instance as the newmodel()
    checkModelName(Model)('warningSubscriber');

    context('properties', () => {
        ['userId', 'warningId'].forEach(
            checkPropertyExists(instance)
        );
    });
});