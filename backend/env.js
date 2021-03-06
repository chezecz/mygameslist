// http://gunargessner.com/gcloud-env-vars/
// Used to set up enviromental variables for Google Cloud App Engine
// Otherwise have to either upload sensitive data to the source control 
// Or have not workable application downloaded straight from the source control

'use strict'

const fs = require('fs')

const dotEnvExists = fs.existsSync('.env')
if (dotEnvExists) {
  console.log('getEnv.js: .env exists, probably running on development environment')
  process.exit()
}

const gcs = require('@google-cloud/storage')()

const bucketName = `envvars${process.env.PROJECT_NAME}`
console.log(`Downloading .env from bucket "${bucketName}"`)
gcs
  .bucket(bucketName)
  .file('.env')
  .download({ destination: '.env' })
  .then(() => {
    console.info('getEnv.js: .env downloaded successfully')
  })
  .catch(e => {
    console.error(`getEnv.js: There was an error: ${JSON.stringify(e, undefined, 2)}`)
  })