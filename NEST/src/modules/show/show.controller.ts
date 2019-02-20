import {
    Controller,
    Post,
    UseGuards,
    ReflectMetadata,
    Body,
    Get,
    Query,
    UsePipes,
    Res,
    FilesInterceptor,
    UploadedFiles,
    UseInterceptors,
    ParseIntPipe,
    Session
} from '@nestjs/common'
import { ShowService } from 'modules/show/show.service'
import { ItemService } from 'modules/item/item.service'
import { RolesGuard } from 'common/guard/roles.guard'
import { Show } from 'modules/show/show.entity'
import { ValidPipe } from 'common/pipe/valid.pipe'
import { SesD } from 'common/decorator/session.decorator'
import { CoreService } from 'modules/core/core.service'
import { BusinessException } from 'common/exception/business.exception'
import { ShowGuard } from 'common/guard/show.guard'
import { FileSystem, CopyDir } from 'common/util/fileSystem'
import Md5 from 'common/util/md5'
import * as fs from 'fs'
import * as fstream from 'fstream'
import * as tar from 'tar'

@Controller('/api/show')
@UseGuards(RolesGuard)
@ReflectMetadata('roles', ['ShowModule'])
export class ShowController {
    constructor(
        private readonly showService: ShowService,
        private readonly itemService: ItemService,
        private readonly coreService: CoreService
    ) {}

    @Get('/')
    @UsePipes(new ValidPipe({ groups: ['query'] }))
    async getShowById(@Res() res, @Query('id', new ParseIntPipe()) id: number, @Session() session) {
        const result = await this.showService.getShowById(id)
        if (!result) throw new BusinessException('应用不存在', 'NOT_EXIST')
        else {
            session.showId = id
            res.sent(result)
        }
    }

    @Get('/getMyShow')
    async getMyShow(@Res() res, @SesD('user') user) {
        const userId = user ? user.id : 0
        const result = await this.showService.getShowsByUserId(userId)
        res.sent(result)
    }

    @Get('/getSystemShow')
    async getSystemShow(@Res() res) {
        const result = await this.showService.getSystemShow()
        res.sent(result)
    }

    @Post('/createShow')
    async createShow(@Res() res, @SesD('user') user, @Body() showDto: Show) {
        showDto.user = user
        showDto.type = user.type
        const result = await this.showService.createShow(showDto)
        res.sent(result.id)
    }

    @Post('/removeShow')
    async removeShow(@Res() res, @Body('id') id: number, @SesD('user') user) {
        const isSelfShow = await this.coreService.checkAuth(id, user)
        if (!isSelfShow) {
            res.sent(null, 'NOT_AUTH', '应用不属于你，无编辑权限')
            return
        }
        const result = await this.showService.removeShow(id)
        res.sent(result)
    }

    @Post('/save')
    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(ShowGuard)
    async save(@Res() res, @SesD('user') user, @Body() showDto: Show, @UploadedFiles() files) {
        // 有文件则上传文件
        if (files) {
            const filepath = await this.coreService.upload(user, showDto.id, files)
            showDto.musicUrl = filepath[0]
        }
        const result = await this.showService.save(showDto)
        res.sent(showDto.musicUrl ? [showDto.musicUrl] : result)
    }

    @Post('/renderStatic')
    async renderStatic(@Res() res, @SesD('showId') showId, @SesD('user') user) {
        const copyDir = new CopyDir()
        const fileSystem = new FileSystem()
        const tempName = Md5((showId + new Date().getTime()).toString())
        const tempDir = 'public/' + tempName

        // 复制静态模板到新目录
        await new Promise(resolve => {
            copyDir.doCopy('public/template', tempDir, resolve)
        })
        // 复制这个应用的相关图片到新目录下
        await new Promise(resolve => {
            copyDir.doCopy(
                `public/upload/${user.username}_${showId}`,
                `${tempDir}/static/public/upload/${user.username}_${showId}`,
                resolve
            )
        })
        // 查询这个应用的数据
        const shown = await this.showService.getShowById(showId)
        const items = await this.itemService.getItemsByShowId(showId)
        // 将这个应用的数据写入到静态文件并放到新目录下
        await new Promise(resolve => {
            fs.writeFile(
                `${tempDir}/static/app.json`,
                JSON.stringify({ result: shown, status: 1 }),
                err => resolve(err)
            )
        })
        await new Promise(resolve => {
            fs.writeFile(
                `${tempDir}/static/item.json`,
                JSON.stringify({ result: items, status: 1 }),
                err => resolve(err)
            )
        })
        // 压缩打包提供下载
        const w = fstream.Writer(`public/zips/${tempName}.zip`)
        // 压缩完成后删除临时目录
        w.on('close', err => {
            fileSystem.removeDir(tempDir)
        })
        fstream
            .Reader(tempDir)
            .pipe(tar.Pack())
            .pipe(w)

        res.sent(`public/zips/${tempName}.zip`)
    }
}
