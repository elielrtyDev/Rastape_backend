 module.exports= {
  "type": "postgres",
  "ssl": process.env.PRODUCTION ? { rejectUnauthorized: false } : false,
  "url": process.env.DATABASE_URL,
  "entities": [
    `./${process.env.FOLDER_TYPEORM}/modules/**/infra/typeorm/entities/*.${process.env.PRODUCTION ? 'js': 'ts'}`
  ],
  "migrations": [
    `./${process.env.FOLDER_TYPEORM}/shared/infra/typeorm/migrations/*.${process.env.PRODUCTION ? 'js': 'ts'}`
  ],
  "cli": {
    "migrationsDir": `./${process.env.FOLDER_TYPEORM}/shared/infra/typeorm/migrations`
  }
}
