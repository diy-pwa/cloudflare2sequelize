import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import { DataTypes } from 'sequelize';

import Cloudflare2Sequelize from '../index.js';
import SQLite from 'sqlite3';

import dotenv from 'dotenv';

dotenv.config();
beforeEach(async()=>{
    await fs.promises.rm("test", { recursive: true, force: true });
});

describe("tests for Sequelize with various urls", () => {
    it("url test.sqlite", async () => {
        const sequelize = new Cloudflare2Sequelize({url: "test.sqlite", mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX});
        const User = sequelize.define('User', {
            username: DataTypes.STRING,
            birthday: DataTypes.DATE,
          });
          await sequelize.sync();
          const jane = await User.create({
            username: 'janedoe',
            birthday: new Date('1980-06-20'),
          });
        
          const users = await User.findAll();
        
          expect(users.length).toBeGreaterThan(0);
    });
    it("url test.sqlite", async () => {
        const sequelize = new Cloudflare2Sequelize({url: `${process.env.SEQUELIZE_NAME}?authToken=${process.env.SEQUELIZE_TOKEN}`, mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX});
        const User = sequelize.define('User', {
            username: DataTypes.STRING,
            birthday: DataTypes.DATE,
          });
          await sequelize.sync();
          const jane = await User.create({
            username: 'janedoe',
            birthday: new Date('1980-06-20'),
          });
        
          const users = await User.findAll();
        
          expect(users.length).toBeGreaterThan(0);
    });
});