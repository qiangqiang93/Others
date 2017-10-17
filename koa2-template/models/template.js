const db = require('../services/dbService')

const Model = db.defineModel('model', {
    attr: {
        type:  db.BIGINT
    }
})
Model.sync();

module.exports = Model;
