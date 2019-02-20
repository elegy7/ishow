import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { CoreModule } from 'modules/core/core.module'
import { AppModule } from 'modules/app/app.module'
import { UserModule } from 'modules/user/user.module'
import { ShowModule } from 'modules/show/show.module'
import { PageModule } from 'modules/page/page.module'
import { ItemModule } from 'modules/item/item.module'
import { ImageModule } from 'modules/image/image.module'

/* tslint:disable */
const ormconf = require('../ormconfig')
/* tslint:enable */
/* orm动态载入 */
const entityContext = require.context('.', true, /\.entity\.ts$/)
const ormConfig: TypeOrmModuleOptions = Object.assign({}, ormconf, {
    entities: [
        ...entityContext.keys().map(id => {
            const entityModule = entityContext(id)
            // We must get entity from module (commonjs)
            // Get first exported value from module (which should be entity class)
            const [entity] = Object.values(entityModule)
            return entity
        })
    ]
})
@Module({
    imports: [
        TypeOrmModule.forRoot(ormConfig),
        CoreModule,
        AppModule,
        UserModule,
        ShowModule,
        ItemModule,
        PageModule,
        ImageModule
    ]
})
export class MainHmrModule {}
