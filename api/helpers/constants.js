const ENV_VARS = require('../../env_vars');

const CONSTANTS = {
    DATABASE_URL: ENV_VARS.DATABASE_URL,
    JWT_SECRET: ENV_VARS.JWT_SECRET,
    TOKEN_EXP: 604800, // 7 days in seconds
    TIMESTAMP_24_HOURS: 86400000 // 24 hours in miliseconds
};

module.exports = CONSTANTS;
