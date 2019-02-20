import { Module, Global } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from 'modules/image/image.entity'
import { ImageService } from 'modules/image/image.service'
import { ImageController } from 'modules/image/image.controller'
import { CoreService } from 'modules/core/core.service'
import { Page } from 'modules/page/page.entity'
import { Item } from 'modules/item/item.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Image, Page, Item])],
    controllers: [ImageController],
    providers: [ImageService, CoreService]
})
export class ImageModule {}
