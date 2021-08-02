import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesRepository } from './images.repository';
import { CreateImageDto } from './dto/create-image.dto';
import { getFileStream, getSecureFileUrl, deleteFileStream } from "src/libs/S3";
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
        const testurl = getSecureFileUrl(key)
        console.log('testUrl: ', testurl)

        return readStream.pipe(res)
    }

    async deleteImageByKey(
        id: number,
        key: string,
    ): Promise<void> {
        const result = await this.imagesRepository.delete({ id })

        if (result.affected === 0) {
            throw new NotFoundException(`Image with id: ${id} not found`)
        }
        else {
            deleteFileStream(key)
        }
    }
}
