import mongoose from 'mongoose'

const {
  DB_USER,
  DB_PASSWORD,
  DB_DOMAIN,
  DB_NAME,
} = process.env;

export default async function connect(): Promise<mongoose.Connection> {
  const dbUri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_DOMAIN}/${DB_NAME}`
  console.log('Connecting to DB...')
  await mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'));
  console.log('DB sucessfully connected!')
  return db
}