import { EntityRepository, Repository } from "typeorm"
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { ImageEntity } from './image.entity';
import { CreateImageDto } from "./dto/create-image.dto";
import { uploadFile } from "src/libs/S3";
import { ManagedUpload } from "aws-sdk/clients/s3";
const fs = require('fs');
const util = require('util');
const unlinkFile = util.promisify(fs.unlink)

@EntityRepository(ImageEntity)
export class ImagesRepository extends Repository<ImageEntity> {
    async createImage(
        createImageDto: CreateImageDto,
        image: Express.Multer.File
    ): Promise<string> {
        const { desc } = createImageDto
        let result: ManagedUpload.SendData

        const newImage = new ImageEntity()
        newImage.desc = desc

        await newImage.save()

        if (image) {
            const imageFile = newImage.id + extname(image.originalname)
            fsExtra.move(image.path, `upload/${imageFile}`)
            newImage.image = imageFile

            result = await uploadFile(image)
            await unlinkFile(`upload/${imageFile}`)
            console.log('result: ', result)
            await newImage.save()
        }

        return `/images/${result.Key}`
    }
}
