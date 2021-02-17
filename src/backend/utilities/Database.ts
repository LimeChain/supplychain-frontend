const knexfile = require('../db/Knexfile');

const environment = process.env.NODE_ENV;
const configuration = knexfile[environment];

const knex = require('knex')(configuration);

export default class Database {

    knex: any;

    constructor() {
        this.knex = knex;
    }

}
