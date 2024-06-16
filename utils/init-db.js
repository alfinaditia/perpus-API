// utils/init-db.js
const bookModel = require('../models/book');
const loanModel = require('../models/loan');
const memberModel = require('../models/member');
const penaltyModel = require('../models/penalty');

async function createTables() {
  try {
    await bookModel.createTable();
    await loanModel.createTable();
    await memberModel.createTable();
    await penaltyModel.createTable();
    console.log('All tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error; // Throw error to stop server startup if tables creation fails
  }
}

module.exports = { createTables };
