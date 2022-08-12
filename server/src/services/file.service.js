const AWS = require('aws-sdk')
const stream = require('stream')
const uuid = require('uuid')
require('dotenv').config()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

class FileService {
  constructor() {
    this.AWS = new AWS.S3()
  }
  async CreateSile(type, file) {
    try {
      const fileName = uuid.v4()
      const uploadStream = () => {
        const pass = new stream.PassThrough()
        const uploadParams = {
          Bucket: process.env.AWS_PUBLIC_BUCKET_NAME,
          Body: pass,
          Key: type + '/' + fileName,
        }
        return {
          writeStream: pass,
          promise: this.AWS.upload(uploadParams).promise(),
        }
      }

      const {writeStream, promise} = uploadStream()
      file.pipe(writeStream)
      await promise

      return type + '/' + fileName
    } catch (err) {
      console.log(err)
    }
  }
}
module.exports = {FileService}
