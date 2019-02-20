import { Module } from '@nestjs/common'
import { ShowController } from 'modules/show/show.controller'
import { ShowService } from 'modules/show/show.service'
import { Show } from 'modules/show/show.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'modules/user/user.entity'
import { Page } from 'modules/page/page.entity'
import { Item } from 'modules/item/item.entity'
import { CoreService } from 'modules/core/core.service'
import { ItemService } from 'modules/item/item.service'

@Module({
    imports: [TypeOrmModule.forFeature([Show, User, Page, Item])],
    controllers: [ShowController],
    providers: [ShowService, ItemService, CoreService]
})
export class ShowModule {}
