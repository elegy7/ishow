import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageController } from 'modules/page/page.controller'
import { Page } from 'modules/page/page.entity'
import { Show } from 'modules/show/show.entity'
import { PageService } from 'modules/page/page.service'

@Module({
    imports: [TypeOrmModule.forFeature([Page, Show])],
    controllers: [PageController],
    providers: [PageService]
})
export class PageModule {}
