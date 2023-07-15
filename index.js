import { Sequelize } from 'sequelize';

export default function (config) {
    let sequelize = null;
    sequelize = new Sequelize(null, null, null, {
        dialect: 'sqlite',
        storage: config.url,
        dialectOptions: config
    });
    return sequelize;
}