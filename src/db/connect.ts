import mongoose from 'mongoose'
import fs from 'fs'
import path from 'path'

const {
  DB_USER,
  DB_PASSWORD,
  DB_DOMAIN,
  DB_NAME,
} = process.env;

function capitalize(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

async function connectToDb(): Promise<mongoose.Connection> {
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

async function setUpModels(db: mongoose.Connection): Promise<void> {
  return new Promise((resolve, reject) => {
    const modelDir = path.join(__dirname, 'models')
    fs.readdir(modelDir, (err, files) => {
      if (err) reject(err)
      files.forEach((filename) => {
        const modelName = filename.split('.')[0]
        console.log('Loading', modelName, 'schema...')
        const schema = require(path.join(modelDir, filename))
        console.log(`Putting ${modelName} schema into db instance as model...`)
        db.model(modelName, schema)
      })
      resolve()
    })
  })
}

async function connect(): Promise<mongoose.Connection> {
  const db = await connectToDb()
  await setUpModels(db);
  return db
}

export default connect