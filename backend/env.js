const fs = require('fs')
const dotEnvExists = fs.existsSync('.env')
const storage = require('@google-cloud/storage')
const bucketStorage = `envvars${process.env.PROJECT_NAME}`

storage
  .bucket(bucketStorage)
  .file('.env')
  .download({ destination: '.env' })
  .then(() => {
    console.info('getEnv.js: .env downloaded successfully')
  })