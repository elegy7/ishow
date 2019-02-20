import { Controller, Post, UseGuards, ReflectMetadata, Body, UsePipes, Res } from '@nestjs/common'
import { RolesGuard } from 'common/guard/roles.guard'
import { PageService } from 'modules/page/page.service'
import { Page } from 'modules/page/page.entity'
import { ValidPipe } from 'common/pipe/valid.pipe'
import { BusinessException } from 'common/exception/business.exception'
import { CoreService } from 'modules/core/core.service'

@Controller('/api/page')
@UseGuards(RolesGuard)
@ReflectMetadata('roles', ['PageModule'])
export class PageController {
    constructor(
        private readonly coreService: CoreService,
        private readonly pageService: PageService
    ) {}

    @Post('/add')
    @UsePipes(new ValidPipe({ groups: ['add'] }))
    async add(@Res() res, @Body() pageDto: Page) {
        const result = await this.pageService.addPage(pageDto.showId, pageDto.imageId)
        res.sent(result)
    }

    @Post('/update')
    @UsePipes(new ValidPipe({ groups: ['update'] }))
    async update(@Res() res, @Body() pageDto: Page) {
        const result = await this.pageService.updatePage(pageDto.id, {
            image: { id: pageDto.imageId }
        })
        res.sent(result)
    }

    @Post('/remove')
    @UsePipes(new ValidPipe({ groups: ['remove'] }))
    async remove(@Res() res, @Body() pageDto: Page) {
        const result = await this.pageService.removePage(pageDto.id, pageDto.showId)
        res.sent(result)
    }

    @Post('/switchPageIndex')
    async switchPageIndex(@Res() res, @Body() pages: any) {
        try {
            await this.pageService.updatePage(pages.from.id, { pageIndex: pages.to.pageIndex })
            await this.pageService.updatePage(pages.to.id, { pageIndex: pages.from.pageIndex })
        } catch (err) {
            new BusinessException(err)
        }
        res.sent()
    }
}
