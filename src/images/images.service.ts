import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesRepository } from './images.repository';
import { CreateImageDto } from './dto/create-image.dto';
import { getFileStream } from "src/libs/S3";
import internal from 'stream';

@Injectable()
export class ImagesService {
    constructor(
        @InjectRepository(ImagesRepository)
        private imagesRepository: ImagesRepository
    ) { }

    async createImage(
        createImageDto: CreateImageDto,
        image: Express.Multer.File,
    ): Promise<string> {
        return this.imagesRepository.createImage(createImageDto, image)
    }

    async getImageByKey(
        key: string,
        res,
    ): Promise<internal.Readable> {
        const readStream = getFileStream(key)

        return readStream.pipe(res)
    }
}
