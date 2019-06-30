require("dotenv").config();

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_BASE,
        host: process.env.DB_HOST,
        dialect: "mysql"
    },
    test: {
        username: "root",
        password: null,
        database: "testdb",
        host: "localhost",
        dialect: "mysql",
        logging: false
    },
    production: {
        use_env_variable: "JAWSDB_URL",
        dialect: "mysql"
    }
};