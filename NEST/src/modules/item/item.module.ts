import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from 'modules/item/item.entity'
import { ItemService } from 'modules/item/item.service'
import { ItemController } from 'modules/item/item.controller'
import { Show } from 'modules/show/show.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Item, Show])],
    controllers: [ItemController],
    providers: [ItemService]
})
export class ItemModule {}
