import { Controller, Get, Param } from '@nestjs/common';
import { DirectImagesService } from './direct-images.service';

@Controller('direct-images')
export class DirectImagesController {
    constructor(private directImagesService: DirectImagesService) { }

    @Get()
    getUploadImageUrl(
    ): Promise<string> {
        return this.directImagesService.getUploadImageUrl()
    }

    @Get('/:key')
    getImageByKey(
        @Param('key') key: string,
    ): Promise<string> {
        return this.directImagesService.getImageByKey(key)
    }
}
