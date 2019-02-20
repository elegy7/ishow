import {
    Get,
    Controller,
    Post,
    Body,
    UseInterceptors,
    FilesInterceptor,
    UploadedFiles,
    Query,
    ReflectMetadata,
    UseGuards,
    Session,
    UsePipes,
    Res
} from '@nestjs/common'
import { ImageService } from 'modules/image/image.service'
import { RolesGuard } from 'common/guard/roles.guard'
import { ValidPipe } from 'common/pipe/valid.pipe'
import { CoreService } from 'modules/core/core.service'

@Controller('/api/image')
@UseGuards(RolesGuard)
@ReflectMetadata('roles', ['PubModule'])
export class ImageController {
    constructor(
        private readonly coreService: CoreService,
        private readonly imageService: ImageService
    ) {}

    @Get('/getImages')
    async getImgs(@Res() res, @Query('use') use: string) {
        const result = await this.imageService.getImages(use)
        res.sent(result)
    }

    @Post('/upload')
    @UsePipes(new ValidPipe({ groups: ['upload'] }))
    @UseInterceptors(FilesInterceptor('files'))
    async upload(@Res() res, @Session() session, @Body() dto, @UploadedFiles() files) {
        // 图片上传
        const filesPath = await this.coreService.upload(session.user, dto.showId, files)
        // 将图片存入数据库
        const result = await this.imageService.saveImages(filesPath, dto.use, dto.showId)
        res.sent(result)
    }

    @Post('/crop')
    @UsePipes(new ValidPipe({ groups: ['crop'] }))
    async crop(@Res() res, @Body() fields) {
        const targetPath = await this.coreService.crop(fields)
        fields.path = targetPath
        res.sent(fields)
    }

    @Post('/removeImage')
    async removeImage(@Res() res, @Body('path') path: string) {
        await this.coreService.removeFile(path)
        const result = await this.imageService.removeImage(path)
        res.sent(result, result.raw.affectedRows, '删除成功')
    }
}
