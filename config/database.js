module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: "mysql",
  define: {
    timestamps: true
  },
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  charset: "utf8",
  // dialectOptions: {
  //   collate: "utf8_general_ci"
  // },
  logging: false
};