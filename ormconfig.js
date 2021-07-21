module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
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