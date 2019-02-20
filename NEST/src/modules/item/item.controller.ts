import {
    Controller,
    UseGuards,
    ReflectMetadata,
    Query,
    Get,
    UsePipes,
    Res,
    Post,
    Body,
    ParseIntPipe
} from '@nestjs/common'
import { RolesGuard } from 'common/guard/roles.guard'
import { ItemService } from 'modules/item/item.service'
import { ValidPipe } from 'common/pipe/valid.pipe'
import { SesD } from 'common/decorator/session.decorator'
import { BusinessException } from 'common/exception/business.exception'
import { Item } from 'modules/item/item.entity'
import { ShowGuard } from 'common/guard/show.guard'

@Controller('/api/item')
@UseGuards(RolesGuard)
@ReflectMetadata('roles', ['ItemModule'])
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Get('/')
    @UsePipes(new ValidPipe({ groups: ['query'] }))
    async getItems(@Res() res, @Query('showId', new ParseIntPipe()) showId: number) {
        const result = await this.itemService.getItemsByShowId(showId)
        if (!result) throw new BusinessException('应用不存在', 'NOT_EXIST')
        else res.sent(result)
    }

    @Post('/add')
    @UseGuards(ShowGuard)
    @UsePipes(new ValidPipe({ groups: ['add'] }))
    async addItem(@Res() res, @Body() itemDto: Item) {
        const result = await this.itemService.addItem(itemDto)
        res.sent(result)
    }

    @Post('/update')
    @UseGuards(ShowGuard)
    @UsePipes(new ValidPipe({ groups: ['update'] }))
    async updateItem(@Res() res, @Body() itemDto: Item) {
        const result = await this.itemService.updateItem(itemDto)
        res.sent(result)
    }

    @Post('/remove')
    @UseGuards(ShowGuard)
    @UsePipes(new ValidPipe({ groups: ['remove'] }))
    async removeItem(@Res() res, @Body() itemDto: Item) {
        const result = await this.itemService.removeItem(itemDto.id)
        res.sent(result)
    }
}
