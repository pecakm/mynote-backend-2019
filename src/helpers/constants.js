require('dotenv').config();

const CONSTANTS = {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_EXP: 604800, // 7 days in seconds
    TIMESTAMP_24_HOURS: 86400000 // 24 hours in miliseconds
};

module.exports = CONSTANTS;
