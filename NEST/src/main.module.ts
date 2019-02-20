import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { CoreModule } from 'modules/core/core.module'
import { AppModule } from 'modules/app/app.module'
import { UserModule } from 'modules/user/user.module'
import { ShowModule } from 'modules/show/show.module'
import { ItemModule } from 'modules/item/item.module'
import { PageModule } from 'modules/page/page.module'
import { ImageModule } from 'modules/image/image.module'

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CoreModule,
        AppModule,
        UserModule,
        ShowModule,
        ItemModule,
        PageModule,
        ImageModule
    ]
})
export class MainModule {}
