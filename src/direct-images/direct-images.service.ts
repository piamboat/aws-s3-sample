import { Injectable } from '@nestjs/common';
import { generateUploadUrl, getSecureFileUrl, generateImageUrl } from '../libs/s3';

@Injectable()
export class DirectImagesService {
    constructor() { }

    async getUploadImageUrl(
    ): Promise<string> {
        const url = generateUploadUrl()

        return url;
    }

    async getImageByKey(
        key: string,
    ): Promise<string> {
        const url = generateImageUrl(key)

        return url
    }

    // async deleteImageByKey(
    //     id: number,
    //     key: string,
    // ): Promise<void> {
    //     const result = await this.imagesRepository.delete({ id })

    //     if (result.affected === 0) {
    //         throw new NotFoundException(`Image with id: ${id} not found`)
    //     }
    //     else {
    //         deleteFileStream(key)
    //     }
    // }
}
