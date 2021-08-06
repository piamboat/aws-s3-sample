import * as AWS from 'aws-sdk';
import { Express } from 'express';
import { randomBytes } from 'crypto'
require('dotenv').config()
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const directBucketName = process.env.AWS_DIRECT_BUCKET_NAME
const directRegion = process.env.AWS_DIRECT_BUCKET_REGION
const directAccessKeyId = process.env.AWS_DIRECT_ACCESS_KEY
const directSecretAccessKey = process.env.AWS_DIRECT_SECRET_KEY

// create an instance of s3
const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
})

// create an instance of direct s3
const dS3 = new AWS.S3({
    region: directRegion,
    accessKeyId: directAccessKeyId,
    secretAccessKey: directSecretAccessKey,
    signatureVersion: 'v4',
})

// direct upload to s3
export const generateUploadUrl = async () => {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const uploadParams = {
        Bucket: directBucketName,
        Key: imageName,
        Expires: 60,
    }

    const uploadUrl = await dS3.getSignedUrlPromise('putObject', uploadParams)
    return uploadUrl
}

// direct image url to s3
export const generateImageUrl = async (fileKey) => {
    const params = {
        Bucket: directBucketName,
        Key: fileKey,
        Expires: 60,
    }

    const imageUrl = await dS3.getSignedUrl('getObject', params)
    return imageUrl
}

// upload a file to s3
export const uploadFile = (file: Express.Multer.File) => {
    console.log('file: ', file)
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    }

    return s3.upload(uploadParams).promise()
}

// download a file to s3
export const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    }

    return s3.getObject(downloadParams).createReadStream()
}

export const getSecureFileUrl = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
        Expires: 60,
    }

    const url = s3.getSignedUrl('getObject', downloadParams);
    return url
}

export const deleteFileStream = (fileKey) => {
    const deleteParams = {
        Key: fileKey,
        Bucket: bucketName,
    }

    s3.deleteObject(deleteParams, (err, data) => {
      if (err) {
        console.log('error detected: ', err, err.stack);
      }
      else {
        console.log(`file ${fileKey} has been deleted from s3`);
      }
    });
}
