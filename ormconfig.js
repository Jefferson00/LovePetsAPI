module.exports = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "entities": process.env.APP_ENVIROMENT === "development" ?
    [
      "./src/modules/**/entities/*.ts"
    ]
    :
    [
      "./dist/modules/**/entities/*.js"
    ],
  "migrations": process.env.APP_ENVIROMENT === "development" ?
    [
      "./src/shared/infra/database/migrations/*.ts"
    ]
    :
    [
      "./dist/shared/infra/database/migrations/*.js"
    ],
  "cli": {
    "migrationsDir": "./src/shared/infra/database/migrations/"
  }
}