import Sequelize from 'sequelize';

import User from '../app/models/User';

import dabaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dabaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
