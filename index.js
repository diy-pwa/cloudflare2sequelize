import { Sequelize } from 'sequelize';
import sqlite3 from '@libsql/sqlite3';
export default function (config) {
    let sequelize = null;
    if(config.url.match(/:\/\//)){
        sequelize = new Sequelize(null, null, null, { dialectModule: sqlite3,
            dialect: "sqlite" ,
            storage: config.url,
            dialectOptions: config
        });
    }else{
        sequelize = new Sequelize(null, null, null, {
            dialect: 'sqlite',
            storage: config.url,
            dialectOptions: config
        });
    }
    return sequelize;
}