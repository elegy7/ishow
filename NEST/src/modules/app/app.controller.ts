import {
    Get,
    Controller,
    UseGuards,
    ReflectMetadata,
    Res,
    Query,
    ParseIntPipe
} from '@nestjs/common'
import { RolesGuard } from 'common/guard/roles.guard'
import { AppService } from 'modules/app/app.service'
import { CoreService } from 'modules/core/core.service'
import { ShowService } from 'modules/show/show.service'
import { ItemService } from 'modules/item/item.service'
import * as path from 'path'

@Controller('/api/app')
@UseGuards(RolesGuard)
@ReflectMetadata('roles', ['PubModule'])
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly coreService: CoreService,
        private readonly showService: ShowService,
        private readonly itemService: ItemService
    ) {}

    @Get('/')
    async app(@Res() res, @Query('showId', new ParseIntPipe()) showId: number) {
        const show = await this.showService.getShowById(showId)
        res.sent(show)
    }

    @Get('/item')
    async getItems(@Res() res, @Query('showId', new ParseIntPipe()) showId: number) {
        const items = await this.itemService.getItemsByShowId(showId)
        res.sent(items)
    }

    @Get('/test')
    async test(@Res() res) {
        await this.coreService.root()
        res.sent('数据库更新成功')
    }

    @Get('/clear')
    async clear(@Res() res) {
        const dirPath = path.resolve(process.cwd(), './public/upload')
        console.log('dirPath', process.cwd(), dirPath)
        await this.coreService.removeUnuseFile(dirPath)
        res.sent('数据库更新成功')
    }
}
