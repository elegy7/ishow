import { Module } from '@nestjs/common'
import { AppController } from 'modules/app/app.controller'
import { AppService } from 'modules/app/app.service'
import { CoreService } from 'modules/core/core.service'
import { ItemService } from 'modules/item/item.service'
import { ShowService } from 'modules/show/show.service'
import { Show } from 'modules/show/show.entity'
import { User } from 'modules/user/user.entity'
import { Page } from 'modules/page/page.entity'
import { Item } from 'modules/item/item.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([Show, User, Page, Item])],
    controllers: [AppController],
    providers: [AppService, CoreService, ShowService, ItemService]
})
export class AppModule {}
