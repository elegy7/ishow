import {
    Controller,
    Post,
    Body,
    UseInterceptors,
    FilesInterceptor,
    UploadedFiles,
    ReflectMetadata,
    UseGuards,
    Session,
    UsePipes,
    Res
} from '@nestjs/common'
import { RolesGuard } from 'common/guard/roles.guard'
import { ValidPipe } from 'common/pipe/valid.pipe'
import { CoreService } from 'modules/core/core.service'
import { SesD } from 'common/decorator/session.decorator'

@Controller('/api/core')
@UseGuards(RolesGuard)
@ReflectMetadata('roles', ['CoreModule'])
export class CoreController {
    constructor(private readonly coreService: CoreService) {}

    @Post('/upload')
    @UsePipes(new ValidPipe({ groups: ['upload-file'] }))
    @UseInterceptors(FilesInterceptor('files'))
    async upload(
        @Res() res,
        @SesD('user') user,
        @Body('showId') showId: number,
        @UploadedFiles() files
    ) {
        // 文件上传
        const filesPath = await this.coreService.upload(user, showId, files)
        res.sent(filesPath)
    }
}
