import { EntityRepository, Repository } from "typeorm"
import * as fsExtra from 'fs-extra';
import { extname } from 'path';
import { ImageEntity } from './image.entity';
import { CreateImageDto } from "./dto/create-image.dto";
import { uploadFile } from "src/libs/S3";

@EntityRepository(ImageEntity)
export class ImagesRepository extends Repository<ImageEntity> {
    async createImage(
        createImageDto: CreateImageDto,
        image: Express.Multer.File
    ): Promise<ImageEntity> {
        const { desc } = createImageDto

        const newImage = new ImageEntity()
        newImage.desc = desc

        await newImage.save()

        if (image) {
            const imageFile = newImage.id + extname(image.originalname)
            fsExtra.move(image.path, `upload/${imageFile}`)
            newImage.image = imageFile

            const result = await uploadFile(image)
            console.log('result: ', result)
            await newImage.save()
        }

        // return `/images/${result.Key}`
        return newImage
    }
}
