import { Module, Global } from '@nestjs/common'
import { CoreService } from 'modules/core/core.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Show } from 'modules/show/show.entity'
import { Item } from 'modules/item/item.entity'
import { Image } from 'modules/image/image.entity'
import { Page } from 'modules/page/page.entity'
import { CoreController } from 'modules/core/core.contoller'

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Show, Item, Image, Page])],
    providers: [CoreService],
    exports: [CoreService],
    controllers: [CoreController]
})
export class CoreModule {}
